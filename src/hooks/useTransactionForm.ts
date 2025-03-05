import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const transactionFormSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
  createdAt: z.string(),
  isRecurrent: z.boolean().default(false),
  recurrentMonths: z.number().optional().refine((val) => {
    if (val === undefined) return true
    return val > 0
  }, "Número de meses deve ser maior que zero")
}).partial()

const newTransactionFormSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
  isRecurrent: z.boolean(),
  recurrentMonths: z.number().optional(),
})

export type TransactionFormInputs = z.infer<typeof transactionFormSchema>
export type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function useTransactionForm() {
  return useForm<TransactionFormInputs>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'income',
      isRecurrent: false
    }
  })
} 

export function useNewTransactionForm() {
  return useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })
}
