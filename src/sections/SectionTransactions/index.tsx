import { useContext } from 'react'
import { SearchTransactions } from '../SearchTransactions'
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

import * as S from './styles'

export function SectionTransactions() {
  const { transactions } = useContext(TransactionsContext)
  const { currentTheme, contrast } = useTheme()
  const { isLoading } = useAuth()

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <S.ContainerTransactions>
      <SearchTransactions />
      {transactions.length === 0 ? (
        <div>Nenhuma transação encontrada</div>
      ) : (
        <S.TransactionsTable currentTheme={currentTheme} contrast={contrast}>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>
                  <S.PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </S.PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>
                  {dateFormatter.format(
                    new Date(transaction.createdAt)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </S.TransactionsTable>
      )}
    </S.ContainerTransactions>
  )
}