import { useContext } from 'react'
import { SearchTransactions } from '../SearchTransactions'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { PencilSimpleLine , Trash  } from 'phosphor-react'
import { useTheme } from '../../hooks/useTheme';

import * as S from './styles'

export function SectionTransactions() {
  const { transactions } = useContext(TransactionsContext)
  const { currentTheme, contrast } = useTheme()

  return (
    <S.ContainerTransactions>
      <SearchTransactions />
      {transactions && transactions.length > 0 && (
        <S.ContainerMainGridTransactions>
          <S.GridHeader contrast={contrast} currentTheme={currentTheme}>
            <span>Nome</span>
            <span>Preço</span>
            <span>Categoria</span>
            <span>Data</span>
            <span>Ações</span>
          </S.GridHeader>

          <S.TransactionsGrid currentTheme={currentTheme} contrast={contrast}>
            {transactions.map((transaction) => {
              return (
                <S.TransactionRow 
                  key={transaction.id}
                  currentTheme={currentTheme}
                  contrast={contrast}
                >
                  <span data-label="Nome">
                    {transaction.description}
                  </span>
                  
                  <span data-label="Preço">
                    <S.PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </S.PriceHighlight>
                  </span>

                  <span data-label="Categoria">
                    {transaction.category}
                  </span>

                  <span data-label="Data">
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </span>

                  <S.ActionButtons contrast={contrast} currentTheme={currentTheme}>
                    <button title="Editar">
                      <PencilSimpleLine  size={20} />
                    </button>
                    <button title="Excluir">
                      <Trash  size={20} />
                    </button>
                  </S.ActionButtons>
                </S.TransactionRow>
              )
            })}
          </S.TransactionsGrid>
        </S.ContainerMainGridTransactions>
      )}
    </S.ContainerTransactions>
  )
}