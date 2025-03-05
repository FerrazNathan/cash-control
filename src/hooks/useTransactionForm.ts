import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const transactionFormSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
    invalid_type_error: "Nome deve ser um texto"
  }),
  price: z.number({
    required_error: "Preço é obrigatório",
    invalid_type_error: "Preço deve ser um número"
  }),
  category: z.string({
    required_error: "Categoria é obrigatória",
    invalid_type_error: "Categoria deve ser um texto"
  }),
  type: z.enum(['income', 'outcome'], {
    required_error: "Tipo é obrigatório",
    invalid_type_error: "Tipo deve ser entrada ou saída"
  }),
  createdAt: z.string({
    required_error: "Data é obrigatória",
    invalid_type_error: "Data deve ser uma string"
  }),
  isRecurrent: z.boolean().default(false),
  recurrentMonths: z.number().optional().refine((val) => {
    if (val === undefined) return true
    return val > 0
  }, "Número de meses deve ser maior que zero")
}).partial()

export type TransactionFormInputs = z.infer<typeof transactionFormSchema>

export function useTransactionForm() {
  return useForm<TransactionFormInputs>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'income',
      isRecurrent: false
    }
  })
} 