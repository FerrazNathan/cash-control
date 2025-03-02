import { useContext } from 'react'
import { SearchTransactions } from '../SearchTransactions'
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { useTheme } from '../../hooks/useTheme';

import * as S from './styles'

export function SectionTransactions() {
  const { transactions } = useContext(TransactionsContext)
  const { currentTheme, contrast } = useTheme()

  return (
    <S.ContainerTransactions>
      <SearchTransactions />
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
    </S.ContainerTransactions>
  )
}