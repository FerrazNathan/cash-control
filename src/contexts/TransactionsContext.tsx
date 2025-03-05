import { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import { 
  collection, 
  addDoc, 
  query, 
  getDocs, 
  where,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";
import { 
  TransactionFormInputs, 
  EditTransactionFormInputs, 
  Transaction 
} from "../@types/transactionForm";

interface TransactionsContextType {
  transactions: Transaction[]
  getTransactions: (query?: string) => Promise<void>
  createTransaction: (data: TransactionFormInputs) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  updateTransaction: (id: string, data: EditTransactionFormInputs) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) { 
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { user } = useAuth()
  
  const getTransactions = useCallback(async (searchQuery?: string) => {
    if (!user) {
      return;
    }

    try {      
      const transactionsRef = collection(db, 'transactions');      
      // Query básica primeiro, sem orderBy
      const q = query(
        transactionsRef,
        where('userId', '==', user.id)
      );

      const querySnapshot = await getDocs(q);

      let transactionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      })) as Transaction[];

      // Ordenar localmente por enquanto
      transactionsData.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Aplicar filtro de busca
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase().trim();
        transactionsData = transactionsData.filter(transaction => 
          transaction.name.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower)
        );
      }

      setTransactions(transactionsData);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  }, [user]);
  
  const createTransaction = useCallback(async (data: TransactionFormInputs) => {
    if (!user) return;

    try {
      const transactionsRef = collection(db, 'transactions');
      const newTransaction = {
        name: data.name,
        price: data.price,
        category: data.category,
        type: data.type,
        createdAt: serverTimestamp(),
        userId: user.id,
        isRecurrent: data.isRecurrent,
        recurrentMonths: data.recurrentMonths
      };

      const docRef = await addDoc(transactionsRef, newTransaction);
      
      setTransactions(state => [{
        id: docRef.id,
        ...newTransaction,
        createdAt: new Date().toISOString()
      }, ...state]);
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw new Error('Erro ao criar transação');
    }
  }, [user])

  const deleteTransaction = async (id: string) => {
    try {
      const transactionRef = doc(db, 'transactions', id)
      await deleteDoc(transactionRef)
      
      setTransactions(state => state.filter(transaction => transaction.id !== id))
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
    }
  }

  const updateTransaction = async (id: string, data: EditTransactionFormInputs) => {
    const transactionRef = doc(db, 'transactions', id)
    await updateDoc(transactionRef, {
      ...data,
      updatedAt: serverTimestamp()
    })

    setTransactions(state => state.map(transaction => 
      transaction.id === id 
        ? { ...transaction, ...data } 
        : transaction
    ))
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await getTransactions();
      } else {
        setTransactions([]);
      }
    };

    fetchData();
  }, [user, getTransactions]);
  
  return (
    <TransactionsContext.Provider
      value={{ 
        transactions, 
        getTransactions, 
        createTransaction, 
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}