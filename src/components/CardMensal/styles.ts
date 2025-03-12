import styled, { css } from 'styled-components'

interface ContainerCardMensalProps {
	contrast: boolean
	currentTheme: string
}

interface ShowTransactionsProps {
	type: 'income' | 'outcome'
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
		max-width: 250px;
		gap: 1rem;
	`}
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
		background: ${contrast ? theme.contrast.dark : type === 'income' ? theme.success.medium : theme.error.medium};
		border: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};
		color: ${theme.white};
		border-radius: 8px;
		padding: 1rem;
		width: 100%;
		max-width: 250px;
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
		max-width: 250px;
		transition: background 0.3s ease;

		&:hover {
			background: ${contrast ? theme.contrast.highlight : theme.primary.medium};
		}
	`}
`
