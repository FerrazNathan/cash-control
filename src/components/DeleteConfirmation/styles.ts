import styled, { css } from 'styled-components'

interface ButtonProps {
	contrast: boolean
}

export const ContainerActions = styled.div`
	display: flex;
	justify-content: center;
	gap: 1rem;
	margin-top: 2rem;
`

export const ButtonDefault = styled.button`	
	padding: 0.75rem 2rem;
	border-radius: 6px;
	border: 0;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.2s;	
`

export const ButtonConfirm = styled(ButtonDefault)<ButtonProps>`
	${({ theme, contrast }) => css`
		background: ${contrast ? theme.contrast.highlight : theme.success.medium};
		color: ${contrast ? theme.contrast.dark : theme.contrast.standard};

		&:hover {
			background: ${contrast ? theme.contrast.highlight : theme.success.light};
		}
	`}
`	

export const ButtonCancel = styled(ButtonDefault)<ButtonProps>`
	${({ theme, contrast }) => css`
		background: ${contrast ? theme.contrast.highlight : theme.error.medium};
		color: ${contrast ? theme.contrast.dark : theme.contrast.standard};

		&:hover {
			background: ${contrast ? theme.contrast.highlight : theme.error.light};
		}
	`}
`