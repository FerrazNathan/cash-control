import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface NewTransactionFormInputs {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  // createdAt: string
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
  
  async function getTransactions(query?: string) {

    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    const data = response.data

    if (query) {
      const filteredData = data.filter((transaction: Transaction) => 
        transaction.description.toLowerCase().includes(query.toLowerCase()) ||
        transaction.category.toLowerCase().includes(query.toLowerCase())
      )
      setTransactions(filteredData)
    } else {
      setTransactions(data)
    }
  }
  
  async function createTransaction(data: NewTransactionFormInputs) {
    const response = await api.post('/transactions', {
      description: data.description,
      price: data.price,
      category: data.category,
      type: data.type,
      createdAt: new Date(),
    })

    setTransactions(state => [response.data, ...state])
  }

  useEffect(() => {
    getTransactions()
  }, [])
  
  return (
    <TransactionsContext.Provider
      value={{ transactions, getTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}