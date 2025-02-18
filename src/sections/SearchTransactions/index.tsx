import { MagnifyingGlass } from 'phosphor-react'
import * as S from './styles'

export function SearchTransactions() {
  return (
    <S.SearchTransactionsContainer>
      <S.InputSearch type="text" placeholder="Buscar transações..." />
      <S.ButtonSearch type='submit'>
        <MagnifyingGlass size={20} />
        Buscar
      </S.ButtonSearch>
    </S.SearchTransactionsContainer>
  )
}