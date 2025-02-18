import { SearchTransactions } from '../SearchTransactions'

import * as S from './styles'

export function SectionTransactions() {
  return (
    <S.ContainerTransactions>
      <SearchTransactions />
      <S.TransactionsTable>
        <tbody>
          <tr>
            <td>Desenvolvimento de site</td>
            <td>
              <S.PriceHighlight variant='income'>
                R$ 12.000,00
              </S.PriceHighlight>
            </td>
            <td>Venda</td>
            <td>17/02/2025</td>
          </tr>
          <tr>
            <td>Pizza</td>
            <td>
              <S.PriceHighlight variant='outcome'>
                R$ -200,00
              </S.PriceHighlight>
            </td>
            <td>Alimentação</td>
            <td>15/02/2025</td>
          </tr>
          <tr>
            <td>Assaí</td>
            <td>
              <S.PriceHighlight variant='outcome'>
                R$ -90,00
              </S.PriceHighlight>
            </td>
            <td>Alimentação</td>
            <td>17/02/2025</td>
          </tr>
        </tbody>
      </S.TransactionsTable>
    </S.ContainerTransactions>
  )
}