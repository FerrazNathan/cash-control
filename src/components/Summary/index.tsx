import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

import * as S from './styles'

export function Summary() {
  const summary = useSummary()
  
  return (
    <S.ContainerSummary>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#00B37E' />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </S.SummaryCard>

      <S.SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color='#F75A68' />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </S.SummaryCard>

      <S.SummaryCard variant='success'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#FFF' />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </S.SummaryCard>
    </S.ContainerSummary>
  )
}