import * as Dialog from '@radix-ui/react-dialog'
import styled, { css } from 'styled-components'

interface ContentProps {
  contrast: boolean
  currentTheme?: string
}

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)<ContentProps>`
  ${({ theme, contrast, currentTheme }) => css`
    border-radius: 8px;
    padding: 2rem;
    background: ${contrast ? theme.contrast.dark: currentTheme === 'dark' ? theme.primary.standard : theme.background.medium};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  
    width: 40%;
		border: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};

    h2 {
      text-align: center;
			color: ${theme.text.standard};
    }

    @media (max-width: 480px) {
			min-width: 340px;
			padding: 1rem;
    }
  `}
`

export const CloseButton = styled(Dialog.Close)<ContentProps>`
  ${({ theme, contrast }) => css`
    position: absolute;
    background: transparent;
    border: 0;
    top: 0.5rem;
    right: 0.5rem;
    line-height: 0;
    cursor: pointer;
    color: ${contrast ? theme.contrast.highlight : theme.surface.standard};
  `}
`                   


