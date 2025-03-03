import { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import { 
  collection, 
  addDoc, 
  query, 
  getDocs, 
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";

interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
  userId: string
}

interface NewTransactionFormInputs {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transaction[]
  getTransactions: (query?: string) => Promise<void>
  createTransaction: (data: NewTransactionFormInputs) => Promise<void>
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
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower)
        );
      }

      setTransactions(transactionsData);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  }, [user]);
  
  const createTransaction = useCallback(async (data: NewTransactionFormInputs) => {
    if (!user) return;

    try {
      const transactionsRef = collection(db, 'transactions');
      const newTransaction = {
        description: data.description,
        price: data.price,
        category: data.category,
        type: data.type,
        createdAt: serverTimestamp(),
        userId: user.id
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
      value={{ transactions, getTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}