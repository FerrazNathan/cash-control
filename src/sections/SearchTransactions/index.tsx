import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import * as S from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchTransactions() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  })

  function handleSearchTransactions(data: SearchFormInputs) {
    console.log(data)
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