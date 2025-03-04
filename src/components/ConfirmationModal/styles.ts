import styled, { css } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

interface ButtonProps {
  contrast: boolean
}

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  background: ${props => props.theme.background.medium};
  padding: 2.5rem 3rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
	position: relative;

  @media (max-width: 480px) {
    max-width: 340px;
    padding: 1rem;
  }

  h2 {
    margin-bottom: 2rem;
    color: ${props => props.theme.text.standard};
  }
` 

export const CloseButton = styled(Dialog.Close)<ButtonProps>`
  ${({ theme, contrast }) => css`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    line-height: 0;
    cursor: pointer;
    color: ${contrast ? theme.contrast.highlight : theme.text.standard};
  `}
`