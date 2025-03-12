import { useTheme } from '../../hooks/useTheme'
import { priceFormatter } from '../../utils/formatter'

import * as S from './styles'

interface CardMensalProps {
	income: number
	outcome: number
	title: string
	onDetailsClick: () => void
}

export function CardMensal({
	income,
	outcome,
	title,
	onDetailsClick,
}: CardMensalProps) {
	const { contrast, currentTheme } = useTheme()
	return (
		<S.ContainerCardMensal contrast={contrast} currentTheme={currentTheme}>
			{title && (
				<S.TitleCardMensal>
					{title}
				</S.TitleCardMensal>
			)}

			{income && (
				<S.ShowTransactions type="income" contrast={contrast}>
					<h3>Entradas</h3>
					<p>{priceFormatter.format(income)}</p>
				</S.ShowTransactions>
			)}

			{outcome && (
				<S.ShowTransactions type="outcome" contrast={contrast}>
					<h3>Saídas</h3>
					<p>{priceFormatter.format(outcome)}</p>
				</S.ShowTransactions>
			)}

			<S.ButtonDetails
				type="button"
				contrast={contrast}
				currentTheme={currentTheme}
				onClick={() => { onDetailsClick }}
			>
				Ver detalhes
			</S.ButtonDetails>
		</S.ContainerCardMensal>
	)
}
