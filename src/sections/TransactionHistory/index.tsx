import { useContext, useMemo } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { CardMensal } from '../../components/CardMensal'
import { TransactionsContext } from '../../contexts/TransactionsContext'

import * as S from './styles'

export function TransactionHistory() {
	const { transactions } = useContext(TransactionsContext)
	const { contrast, currentTheme } = useTheme()

	const monthlyData = useMemo(() => {
		const grouped = transactions.reduce((acc, transaction) => {
			const date = new Date(transaction.createdAt)
			const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
			
			if (!acc[monthKey]) {
				acc[monthKey] = {
					income: 0,
					outcome: 0,
					title: new Date(date.getFullYear(), date.getMonth()).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
				}
			}

			if (transaction.type === 'income') {
				acc[monthKey].income += transaction.price
			} else {
				acc[monthKey].outcome += transaction.price
			}

			return acc
		}, {} as Record<string, { title: string; income: number; outcome: number }>)

		return Object.entries(grouped)
			.sort(([a], [b]) => b.localeCompare(a))
	}, [transactions])

	const handleDetailsClick = (month: string) => {
		// Aqui você pode implementar a lógica para mostrar o gráfico
		console.log(`Mostrar detalhes de ${month}`)
	}
	
	return (
		<S.Container contrast={contrast} currentTheme={currentTheme}>
			<h2>Histórico de Transações</h2>

			{monthlyData.length && (
				<S.CardsGrid>
					{monthlyData.map(([month, data]) => (
						<CardMensal 
							key={month}
							title={data.title}
							income={data.income}
							outcome={data.outcome}
							onDetailsClick={() => handleDetailsClick(month)}
						/>
					))}
				</S.CardsGrid>
			)}
		</S.Container>
	)
} 