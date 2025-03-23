import styled, { css } from 'styled-components'

interface ContainerCardMensalProps {
	contrast: boolean
	currentTheme: string
}

interface ShowTransactionsProps {
	type: 'income' | 'outcome' | 'investments'
	contrast: boolean
}

export const ContainerCardMensal = styled.div<ContainerCardMensalProps>`
	${({ contrast, currentTheme, theme }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.primary.light : theme.surface.standard};
		border: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};
		border-radius: 8px;
		padding: 1rem;
		width: 100%;
		max-width: 300px;
		gap: 0.5rem;
	`}
`

export const ContainerTransactionsBalance = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
	width: 100%;
	// cursor: pointer;
	// overflow-x: scroll;

	// scrollbar-width: none;
  // -ms-overflow-style: none;

  // &::-webkit-scrollbar {
  //   display: none;
  // }

	// @media (max-width: 768px) {
		flex-direction: column;
	// 	align-items: center;
	// 	min-width: 160px;
	// }
`

export const TitleCardMensal = styled.h3`
	${({ theme }) => css`
		font-weight: 700;
		color: ${theme.text.standard};
		text-transform: capitalize;
	`}
`

export const ShowTransactions = styled.div<ShowTransactionsProps>`
	${({ type, theme, contrast }) => css`
		background: ${contrast ? theme.contrast.dark : type === 'income' ? theme.success.medium : type === 'outcome' ? theme.error.medium : theme.contrast.dark};
		border: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};
		color: ${theme.white};
		border-radius: 8px;
		padding: 0.5rem 1rem;
		width: 100%;
	`}
`

export const ButtonDetails = styled.button<ContainerCardMensalProps>`
	${({ contrast, currentTheme, theme }) => css`
		background: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.primary.standard : theme.primary.standard};
		color: ${contrast ? theme.contrast.dark : theme.white};
		border-radius: 8px;
		border: none;
		outline: none;
		cursor: pointer;
		padding: 1rem;
		width: 100%;
		transition: background 0.3s ease;

		&:hover {
			background: ${contrast ? theme.contrast.highlight : theme.primary.medium};
		}
	`}
`
