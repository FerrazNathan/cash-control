import { useContext } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { calculateInvestments, investmentCategories } from '../../utils/categoryFilters'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { priceFormatter } from '../../utils/formatter'

import * as S from './styles'

interface CardDetailsProps {
	income?: number
	outcome?: number
	title: string
	period: string
	viewMode: 'monthly' | 'yearly'
	onDetailsClick: () => void
}

export function CardDetails({
	income,
	outcome,
	title,
	period,
	viewMode,
	onDetailsClick,
}: CardDetailsProps) {
	const { contrast, currentTheme } = useTheme()
	const validateValue = income || outcome !== 0
	const { transactions } = useContext(TransactionsContext)

	const periodTransactions = transactions.filter(transaction => {
		const transactionDate = new Date(transaction.createdAt)
		
		if (viewMode === 'monthly') {
			const [year, month] = period.split('-')
			return transactionDate.getFullYear() === Number(year) &&
				transactionDate.getMonth() + 1 === Number(month)
		} else {
			return transactionDate.getFullYear() === Number(period)
		}
	})

	const investments = calculateInvestments(periodTransactions)

	return (
		<S.ContainerCardMensal contrast={contrast} currentTheme={currentTheme}>
			{title && (
				<S.TitleCardMensal>
					{title}
				</S.TitleCardMensal>
			)}

			<S.ContainerTransactionsBalance>
				{income && validateValue && (
					<S.ShowTransactions type="income" contrast={contrast}>
						<h3>Entradas</h3>
						<p>{priceFormatter.format(income)}</p>
					</S.ShowTransactions>
				)}

				{outcome && validateValue && (
					<S.ShowTransactions type="outcome" contrast={contrast}>
						<h3>Saídas</h3>
						<p>{priceFormatter.format(outcome)}</p>
					</S.ShowTransactions>
				)}

				{periodTransactions.some(t => investmentCategories.includes(t.category)) && (
					<S.ShowTransactions type="investments" contrast={contrast}>
						<h3>Investimentos</h3>
						<p>{priceFormatter.format(investments)}</p>
					</S.ShowTransactions>
				)}
			</S.ContainerTransactionsBalance>

			<S.ButtonDetails
				type="button"
				contrast={contrast}
				currentTheme={currentTheme}
				onClick={onDetailsClick}
			>
				Ver detalhes
			</S.ButtonDetails>
		</S.ContainerCardMensal>
	)
}
