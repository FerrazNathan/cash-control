import { useContext } from 'react'
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import { Controller } from 'react-hook-form'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useTransactionForm } from '../../hooks/useTransactionForm'
import { Modal } from '../Modal'
import { EditTransactionFormInputs } from '../../@types/transactionForm'

import * as S from './styles'
import { useTheme } from '../../hooks/useTheme'

interface EditTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: {
    id: string
    name: string
    price: number
    category: string
    type: 'income' | 'outcome'
    createdAt: string
    isRecurrent: boolean
    recurrentMonths: number
  }
}

export function EditTransaction({ isOpen, onClose, transaction }: EditTransactionModalProps) {
  const { updateTransaction } = useContext(TransactionsContext)
  const { currentTheme, contrast } = useTheme()

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useTransactionForm()

  const isRecurrent = watch('isRecurrent')

  async function handleEditTransaction(data: EditTransactionFormInputs) {
    await updateTransaction(transaction.id, data)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar transação"
    >
      <S.FormContainer 
        currentTheme={currentTheme}
        contrast={contrast}
        onSubmit={handleSubmit(handleEditTransaction)}
      >
        <S.Label>
          <span>Nome</span>
          <input 
            type="text"
            placeholder="Nome"
            defaultValue={transaction.name}
            {...register('name')}
          />
          {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
        </S.Label>

        <S.Label>
          <span>Preço</span>
          <input 
            type="number"
            placeholder="Preço"
            defaultValue={transaction.price}
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && <S.ErrorMessage>{errors.price.message}</S.ErrorMessage>}
        </S.Label>

        <S.Label>
          <span>Categoria</span>
          <input 
            type="text"
            placeholder="Categoria"
            defaultValue={transaction.category}
            {...register('category')}
          />
          {errors.category && <S.ErrorMessage>{errors.category.message}</S.ErrorMessage>}
          <span>Adicionando uma categoria "Investimentos", você terá acesso á gráficos e cálculos de investimentos.</span>
        </S.Label>

        <S.Label>
          <span>Data</span>
          <input 
            type="date"
            defaultValue={new Date(transaction.createdAt).toISOString().split('T')[0]}
            {...register('createdAt')}
          />
          {errors.createdAt && <S.ErrorMessage>{errors.createdAt.message}</S.ErrorMessage>}
        </S.Label>

        <Controller 
          control={control}
          name="type"
          defaultValue={transaction.type}
          render={({ field }) => (
            <S.TransactionType onValueChange={field.onChange} value={field.value}>
              <S.TransactionTypeButton 
                variant="income" 
                value="income" 
                contrast={contrast}
                currentTheme={currentTheme}
              >
                <ArrowCircleUp size={24} />
                Entrada
              </S.TransactionTypeButton>
              <S.TransactionTypeButton 
                variant="outcome" 
                value="outcome" 
                contrast={contrast} 
                currentTheme={currentTheme}
              >
                <ArrowCircleDown size={24} />
                Saída
              </S.TransactionTypeButton>
            </S.TransactionType>
          )}
        />
        <S.RecurrentContainer contrast={contrast}>
          <span>Transação Recorrente?</span>
          <input
            type="checkbox"
            defaultChecked={transaction.isRecurrent}
            {...register('isRecurrent')}
          />
        </S.RecurrentContainer>

        {isRecurrent && (
          <S.Label>
            <span>Número de meses</span>
            <input
              type="number"
              placeholder="Número de meses"
              defaultValue={transaction.recurrentMonths}
              {...register('recurrentMonths', { valueAsNumber: true })}
            />
            {errors.recurrentMonths && (
              <S.ErrorMessage>{errors.recurrentMonths.message}</S.ErrorMessage>
            )}
          </S.Label>
        )}

        <button type="submit" disabled={isSubmitting}>
          Salvar
        </button>
      </S.FormContainer>
    </Modal>
  )
} 