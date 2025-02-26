import { useContext } from 'react'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { z } from 'zod'

import * as S from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchTransactions() {
  const { getTransactions } = useContext(TransactionsContext)

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await getTransactions(data.query)
    reset()
  }
  
  return (
    <S.SearchTransactionsContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <S.InputSearch type="text" placeholder="Buscar transações..." {...register('query')} />
      <S.ButtonSearch type='submit' disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </S.ButtonSearch>
    </S.SearchTransactionsContainer>
  )
}