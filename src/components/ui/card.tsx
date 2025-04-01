import { styled, css } from "styled-components"

interface Themes {
	contrast: boolean
	currentTheme: string
}

const StyledCard = styled.div<Themes>`
	${({ theme, contrast, currentTheme }) => css`
  background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.white};
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};
	box-shadow: ${currentTheme === 'light' ? '0px 4px 16px 4px rgba(29, 29, 29, 0.24)' : ''};
`}
`

const CardHeader = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

const CardTitle = styled.h3<Themes>`
	${({ theme, contrast, currentTheme }) => css`
		font-size: 1.5rem;
		font-weight: bold;
		color: ${contrast ? theme.contrast.standard : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
	`}
`

const CardDescription = styled.p<Themes>`
	${({ theme, contrast, currentTheme }) => css`
		color: ${contrast ? theme.contrast.standard : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
		font-size: 0.875rem;
		text-transform: capitalize;
	`}
`

const CardContent = styled.div`
  padding: 1rem 0;
`

export { StyledCard as Card, CardHeader, CardTitle, CardDescription, CardContent } 