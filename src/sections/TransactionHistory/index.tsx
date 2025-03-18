import React, { useContext, useMemo, useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { CardMensal } from '../../components/CardMensal'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { TransactionsChart } from '../../components/TransactionsChart'

import * as S from './styles'

type ViewMode = 'monthly' | 'yearly'

export function TransactionHistory() {
	const { transactions } = useContext(TransactionsContext)
	const { contrast, currentTheme } = useTheme()
	const [viewMode, setViewMode] = useState<ViewMode>('monthly')
	const [selectedPeriod, setSelectedPeriod] = useState(() => {
		const today = new Date()
		return viewMode === 'monthly'
			? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
			: today.getFullYear().toString()
	})

	useEffect(() => {
		const today = new Date()
		if (viewMode === 'monthly') {
			setSelectedPeriod(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`)
		} else {
			setSelectedPeriod(today.getFullYear().toString())
		}
	}, [viewMode])

	const periodData = useMemo(() => {
		if (viewMode === 'monthly') {
			return transactions.reduce((acc, transaction) => {
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
		} else {
			return transactions.reduce((acc, transaction) => {
				const year = new Date(transaction.createdAt).getFullYear().toString()

				if (!acc[year]) {
					acc[year] = {
						income: 0,
						outcome: 0,
						title: year
					}
				}

				if (transaction.type === 'income') {
					acc[year].income += transaction.price
				} else {
					acc[year].outcome += transaction.price
				}

				return acc
			}, {} as Record<string, { title: string; income: number; outcome: number }>)
		}
	}, [transactions, viewMode])

	const chartData = useMemo(() => {
		if (viewMode === 'monthly') {
			const [year, month] = selectedPeriod.split('-')
			const daysInMonth = new Date(Number(year), Number(month), 0).getDate()

			return Array.from({ length: daysInMonth }).map((_, index) => {
				const day = index + 1
				const dayTransactions = transactions.filter(t => {
					const date = new Date(t.createdAt)
					return date.getFullYear() === Number(year) &&
						date.getMonth() + 1 === Number(month) &&
						date.getDate() === day
				})

				return {
					day,
					income: dayTransactions.reduce((sum, t) => t.type === 'income' ? sum + t.price : sum, 0),
					outcome: dayTransactions.reduce((sum, t) => t.type === 'outcome' ? sum + t.price : sum, 0)
				}
			})
		} else {
			const selectedYear = Number(selectedPeriod)

			return Array.from({ length: 12 }).map((_, index) => {
				const monthTransactions = transactions.filter(t => {
					const date = new Date(t.createdAt)
					return date.getFullYear() === selectedYear &&
						date.getMonth() === index
				})

				return {
					month: new Date(2024, index).toLocaleString('pt-BR', { month: 'short' }),
					income: monthTransactions.reduce(
						(sum, t) => t.type === 'income' ? sum + t.price : sum,
						0
					),
					outcome: monthTransactions.reduce(
						(sum, t) => t.type === 'outcome' ? sum + t.price : sum,
						0
					)
				}
			})
		}
	}, [transactions, viewMode, selectedPeriod])

	return (
		<S.Container contrast={contrast} currentTheme={currentTheme}>
			<h2>Histórico de Transações</h2>
			{transactions && transactions.length > 0 && (
				<React.Fragment>
					<S.Label contrast={contrast}>
						<span>Alternar Visualização</span>
						<S.SelectComponent
					contrast={contrast}
					value={viewMode}
					onChange={(e) => setViewMode(e.target.value as ViewMode)}
				>
					<option value="monthly">Mensal</option>
					<option value="yearly">Anual</option>
				</S.SelectComponent>
			</S.Label>
			
			<S.ContainerCardsChart>
				<S.CardsGrid>
					{Object.entries(periodData)
						.sort(([a], [b]) => b.localeCompare(a))
						.map(([period, data]) => (
							<CardMensal
								key={period}
								title={data.title}
								income={data.income}
								outcome={data.outcome}
								onDetailsClick={() => setSelectedPeriod(period)}
							/>
						))}
				</S.CardsGrid>
				<S.ContainerChart>
					<TransactionsChart
						period={selectedPeriod}
						data={chartData}
						viewMode={viewMode}
					/>			
					</S.ContainerChart>	
				</S.ContainerCardsChart>
			</React.Fragment>
			)}
		</S.Container>
	)
} 