import { useContext, useMemo, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { CardMensal } from '../../components/CardMensal'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { TransactionsChart } from '../../components/TransactionsChart'

import * as S from './styles'

export function TransactionHistory() {
	const { transactions } = useContext(TransactionsContext)
	const { contrast, currentTheme } = useTheme()
	const [selectedMonth, setSelectedMonth] = useState(() => {
		const today = new Date()
		return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
	})

	// Dados para os cards mensais
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

	// Dados para o gráfico do mês selecionado
	const chartData = useMemo(() => {
		const monthTransactions = transactions.filter(transaction => {
			const transactionDate = new Date(transaction.createdAt)
			const transactionMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`
			return transactionMonth === selectedMonth
		})

		const dailyData = monthTransactions.reduce((acc, transaction) => {
			const day = new Date(transaction.createdAt).getDate()

			if (!acc[day]) {
				acc[day] = { day, income: 0, outcome: 0 }
			}

			if (transaction.type === 'income') {
				acc[day].income += transaction.price
			} else {
				acc[day].outcome += transaction.price
			}

			return acc
		}, {} as Record<number, { day: number; income: number; outcome: number }>)

		return Object.values(dailyData).sort((a, b) => a.day - b.day)
	}, [transactions, selectedMonth])

	const handleDetailsClick = (month: string) => {
		setSelectedMonth(month)
	}

	return (
		<S.Container contrast={contrast} currentTheme={currentTheme}>
			<h2>Histórico de Transações</h2>

			<S.ContainerCardsChart>
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
				<S.ContainerChart>
					<TransactionsChart
						month={selectedMonth}
						transactions={chartData}
						/>
				</S.ContainerChart>
			</S.ContainerCardsChart>
		</S.Container>
	)
} 