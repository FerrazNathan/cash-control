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
  orderBy,
  or
} from 'firebase/firestore';
import { db } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";
import { 
  TransactionFormInputs, 
  EditTransactionFormInputs, 
  Transaction 
} from "../@types/transactionForm";
import { Timestamp } from 'firebase/firestore';

interface TransactionsContextType {
  transactions: Transaction[]
  getTransactions: (filters: TransactionFilters) => Promise<void>
  createTransaction: (data: TransactionFormInputs) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  updateTransaction: (id: string, data: EditTransactionFormInputs) => Promise<void>
}

interface TransactionFilters {
  query?: string
  month?: string
  type?: 'all' | 'income' | 'outcome'
  priceRange?: {
    min?: number
    max?: number
  }
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) { 
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { user } = useAuth()
  
  const getTransactions = useCallback(async (filters: TransactionFilters = {}) => {
    if (!user) return

    try {
      let transactionsQuery = query(
        collection(db, 'transactions'),
        where('userId', '==', user.id),
        orderBy('createdAt', 'desc')
      )

      // Busca por texto deve ser feita após receber os dados
      const response = await getDocs(transactionsQuery)
      let fetchedTransactions = response.docs.map(doc => {
        const data = doc.data()
        const createdAt = data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate().toISOString()
          : typeof data.createdAt === 'string' 
            ? data.createdAt 
            : new Date().toISOString()

        return {
          id: doc.id,
          ...data,
          createdAt
        }
      }) as Transaction[]

      // Aplicar filtros
      if (filters.query) {
        const searchTerm = filters.query.toLowerCase()
        fetchedTransactions = fetchedTransactions.filter(transaction => 
          transaction.name.toLowerCase().includes(searchTerm) ||
          transaction.category.toLowerCase().includes(searchTerm)
        )
      }

      // Filtros adicionais
      let filteredTransactions = fetchedTransactions

      if (filters.month) {
        filteredTransactions = filteredTransactions.filter(transaction => {
          try {
            const transactionDate = new Date(transaction.createdAt)
            const transactionMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`
            return transactionMonth === filters.month
          } catch {
            return false
          }
        })
      }

      if (filters.type && filters.type !== 'all') {
        filteredTransactions = filteredTransactions.filter(
          transaction => transaction.type === filters.type
        )
      }

      if (filters.priceRange) {
        if (filters.priceRange.min !== undefined) {
          filteredTransactions = filteredTransactions.filter(
            transaction => transaction.price >= filters.priceRange!.min!
          )
        }
        if (filters.priceRange.max !== undefined) {
          filteredTransactions = filteredTransactions.filter(
            transaction => transaction.price <= filters.priceRange!.max!
          )
        }
      }

      setTransactions(filteredTransactions)
    } catch (error) {
      console.error('Erro ao buscar transações:', error)
      throw new Error('Erro ao buscar transações')
    }
  }, [user])
  
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
        recurrentMonths: data.isRecurrent ? data.recurrentMonths || 1 : 0
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