import { useTheme } from '../../hooks/useTheme'
import { priceFormatter } from '../../utils/formatter'

import * as S from './styles'

interface CardDetailsProps {
	income?: number
	outcome?: number
	title: string
	onDetailsClick: () => void
}

export function CardDetails({
	income,
	outcome,
	title,
	onDetailsClick,
}: CardDetailsProps) {
	const { contrast, currentTheme } = useTheme()
	const validateValue = income || outcome !== 0

	return (
		<S.ContainerCardMensal contrast={contrast} currentTheme={currentTheme}>
			{title && (
				<S.TitleCardMensal>
					{title}
				</S.TitleCardMensal>
			)}

			<S.ContainerTransactionsBalnace>
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
			</S.ContainerTransactionsBalnace>

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
