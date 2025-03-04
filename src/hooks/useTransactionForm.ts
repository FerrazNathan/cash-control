import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const newTransactionFormSchema = z.object({
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
  })
})

const editTransactionFormSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  type: z.enum(['income', 'outcome']).optional(),
  createdAt: z.string({
    required_error: "Data é obrigatória",
    invalid_type_error: "Data deve estar no formato correto"
  }).optional()
})

type NewTransactionInputs = z.infer<typeof newTransactionFormSchema>
type EditTransactionInputs = z.infer<typeof editTransactionFormSchema>

export function useNewTransactionForm() {
  return useForm<NewTransactionInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })
}

export function useEditTransactionForm() {
  return useForm<EditTransactionInputs>({
    resolver: zodResolver(editTransactionFormSchema),
  })
} 