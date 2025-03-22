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
      const transactionsQuery = query(
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
      const transactions: Transaction[] = [];

      // Pega a data atual para base
      const baseDate = new Date();
      
      // Cria a transação base (primeira parcela)
      const baseTransaction = {
        name: data.name,
        price: data.price,
        category: data.category,
        type: data.type,
        userId: user.id,
        isRecurrent: data.isRecurrent,
        recurrentMonths: data.isRecurrent ? data.recurrentMonths || 1 : 0,
        currentInstallment: 1, // Primeira parcela
        createdAt: Timestamp.fromDate(baseDate)
      };

      // Adiciona a transação original
      const docRef = await addDoc(transactionsRef, baseTransaction);
      transactions.push({
        id: docRef.id,
        ...baseTransaction,
        createdAt: baseDate.toISOString()
      });

      // Se for recorrente, cria as transações futuras
      if (data.isRecurrent && data.recurrentMonths) {
        for (let i = 1; i < data.recurrentMonths; i++) {
          // Cria uma nova data para cada mês subsequente
          const nextDate = new Date(baseDate);
          nextDate.setMonth(baseDate.getMonth() + i);
          // Mantém o mesmo dia do mês
          nextDate.setDate(baseDate.getDate());

          const recurrentTransaction = {
            ...baseTransaction,
            currentInstallment: i + 1, // Incrementa o número da parcela
            createdAt: Timestamp.fromDate(nextDate)
          };

          const recurrentDocRef = await addDoc(transactionsRef, recurrentTransaction);
          transactions.push({
            id: recurrentDocRef.id,
            ...recurrentTransaction,
            createdAt: nextDate.toISOString()
          });
        }
      }

      // Atualiza o estado com todas as transações
      setTransactions(state => [...transactions, ...state]);
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw new Error('Erro ao criar transação');
    }
  }, [user]);

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
    try {
      const transactionsRef = collection(db, 'transactions');
      const transactions: Transaction[] = [];
      
      // Atualiza a transação original
      const transactionRef = doc(db, 'transactions', id);
      const baseDate = new Date(data.createdAt || new Date());
      
      const updatedTransaction = {
        name: data.name!,
        price: data.price!,
        category: data.category!,
        type: data.type!,
        userId: user!.id,
        updatedAt: serverTimestamp(),
        currentInstallment: 1,
        createdAt: data.createdAt || new Date().toISOString(),
        isRecurrent: data.isRecurrent || false,
        recurrentMonths: data.recurrentMonths || 0
      };

      await updateDoc(transactionRef, updatedTransaction);
      transactions.push({ id, ...updatedTransaction });

      // Se adicionou recorrência, cria as transações futuras
      if (data.isRecurrent && data.recurrentMonths && data.recurrentMonths > 1) {
        for (let i = 1; i < data.recurrentMonths; i++) {
          const nextDate = new Date(baseDate);
          nextDate.setMonth(baseDate.getMonth() + i);
          nextDate.setDate(baseDate.getDate());

          const recurrentTransaction = {
            name: data.name!,
            price: data.price!,
            category: data.category!,
            type: data.type!,
            userId: user!.id,
            isRecurrent: data.isRecurrent || false,
            recurrentMonths: data.recurrentMonths || 0,
            currentInstallment: i + 1,
            createdAt: Timestamp.fromDate(nextDate),
            updatedAt: serverTimestamp()
          };

          const recurrentDocRef = await addDoc(transactionsRef, recurrentTransaction);
          transactions.push({
            id: recurrentDocRef.id,
            ...recurrentTransaction,
            createdAt: nextDate.toISOString()
          });
        }
      }

      // Atualiza o estado com todas as transações
      setTransactions(state => {
        const stateWithoutUpdated = state.filter(t => t.id !== id);
        return [...transactions, ...stateWithoutUpdated];
      });
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw new Error('Erro ao atualizar transação');
    }
  };

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