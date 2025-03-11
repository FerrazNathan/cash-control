import { useState } from 'react'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useTheme } from '../../hooks/useTheme'

import * as S from './styles'

export function TransactionHistory() {
	const { contrast, currentTheme } = useTheme()
	
	return (
		<S.Container contrast={contrast} currentTheme={currentTheme}>
			<h2>Histórico de Transações</h2>
		</S.Container>
	)
} 