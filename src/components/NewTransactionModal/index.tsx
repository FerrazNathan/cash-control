import { useContext } from 'react'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { z } from 'zod'

import * as S from './styles'

const newTransactionFormSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
  isRecurrent: z.boolean(),
  recurrentMonths: z.number().optional(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

interface NewTransactionModalProps {
  onClose?: () => void
}

export function NewTransactionModal({ onClose }: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext)
  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })  

  const isRecurrent = watch('isRecurrent')

  async function handleCreateTransaction(data: NewTransactionFormInputs) {
    await createTransaction(data)
    reset()
    onClose?.()
  }

  return (
    <Dialog.Portal> {/* Renderiza o conteúdo do modal no final do DOM (fora da hierarquia atual) para evitar problemas de z-index */}
      <S.Overlay /> {/* Camada escura de fundo que fica por trás do modal */}
      <S.Content> {/* Container principal do conteúdo do modal */}
        <Dialog.Title>Nova Transação</Dialog.Title> {/* Título do modal - importante para acessibilidade */}
        <S.CloseButton> {/* Botão de fechar o modal - pode ser personalizado com asChild também */}
          <X size={24} />
        </S.CloseButton>

        <S.FormContainer onSubmit={handleSubmit(handleCreateTransaction)}>
          <S.Label>
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome"
              required
              {...register('name')}
            />
            {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
          </S.Label>

          <S.Label>
            <span>Preço</span>
              <input
              type="number"
              placeholder="Preço"
              required
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && <S.ErrorMessage>{errors.price.message}</S.ErrorMessage>}
          </S.Label>
          
          <S.Label>
            <span>Categoria</span>
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register('category')}
            />
            {errors.category && <S.ErrorMessage>{errors.category.message}</S.ErrorMessage>}
          </S.Label>

          <S.RecurrentContainer>
            <span>Transação Recorrente?</span>
            <input
              type="checkbox"
              {...register('isRecurrent')}
            />
          </S.RecurrentContainer>

          {isRecurrent && (
            <S.Label>
              <span>Número de meses</span>
              <input
                type="number"
                placeholder="Número de meses"
                {...register('recurrentMonths', { valueAsNumber: true })}
              />
              {errors.recurrentMonths && (
                <S.ErrorMessage>{errors.recurrentMonths.message}</S.ErrorMessage>
              )}
            </S.Label>
          )}

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