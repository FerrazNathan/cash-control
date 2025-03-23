import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar, CurrencyBtc } from 'phosphor-react'

import { useTheme } from '../../hooks/useTheme'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { calculateInvestments } from '../../utils/categoryFilters'

import * as S from './styles'

export function Summary() {
  const summary = useSummary()
  const { contrast } = useTheme()
  const { transactions } = useContext(TransactionsContext)

  const balanceCheck = summary.total >= 0 ? 'positive' : 'negative'
  const investments = calculateInvestments(transactions)

  return (
    <S.ContainerSummary>
      <S.SummaryCard contrast={contrast}>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#00B37E' />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </S.SummaryCard>

      <S.SummaryCard contrast={contrast}>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color='#F75A68' />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </S.SummaryCard>

      <S.SummaryCard contrast={contrast}>
        <header>
          <span>Investimentos</span>
          <CurrencyBtc size={32} color='yellow' />
        </header>

        <strong>{priceFormatter.format(investments)}</strong>
      </S.SummaryCard>

      <S.SummaryCard contrast={contrast} variant={balanceCheck}>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#FFF' />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </S.SummaryCard>
    </S.ContainerSummary>
  )
}