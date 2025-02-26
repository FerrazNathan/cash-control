import { useContext } from 'react'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { z } from 'zod'

import * as S from './styles'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })  

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction({
      description: data.description,
      price: data.price,
      category: data.category,
      type: data.type,
    })
    reset()
  }

  return (
    <Dialog.Portal> {/* Renderiza o conteúdo do modal no final do DOM (fora da hierarquia atual) para evitar problemas de z-index */}
      <S.Overlay /> {/* Camada escura de fundo que fica por trás do modal */}
      <S.Content> {/* Container principal do conteúdo do modal */}
        <Dialog.Title>Nova Transação</Dialog.Title> {/* Título do modal - importante para acessibilidade */}
        <S.CloseButton> {/* Botão de fechar o modal - pode ser personalizado com asChild também */}
          <X size={24} />
        </S.CloseButton>

        <S.FormContainer onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <S.Label>
            <span>Descrição</span>
            <input
              type="text"
              placeholder="Descrição"
              required
              {...register('description')}
            />
          </S.Label>

          <S.Label>
            <span>Preço</span>
              <input
              type="number"
              placeholder="Preço"
              required
              {...register('price', { valueAsNumber: true })}
            />
          </S.Label>
          
          <S.Label>
            <span>Categoria</span>
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register('category')}
            />
          </S.Label>

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <S.TransactionType onValueChange={field.onChange} value={field.value}>
                  <S.TransactionTypeButton variant="income" value="income" >
                    <ArrowCircleUp size={24} />
                    Entrada
                  </S.TransactionTypeButton>

                  <S.TransactionTypeButton variant="outcome" value="outcome" >
                    <ArrowCircleDown size={24} />
                    Saída
                  </S.TransactionTypeButton>
                </S.TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </S.FormContainer>

      </S.Content>
    </Dialog.Portal>
  )
}