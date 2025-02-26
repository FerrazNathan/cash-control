import { useContext } from 'react'
import { SearchTransactions } from '../SearchTransactions'
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '../../utils/formatter';

import * as S from './styles'

export function SectionTransactions() {
  const { transactions } = useContext(TransactionsContext)

  return (
    <S.ContainerTransactions>
      <SearchTransactions />
      <S.TransactionsTable>
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