import styled, { css } from "styled-components";
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'


interface FormContainerProps {
  currentTheme?: string
  contrast: boolean
}

interface TransactionTypeButtonProps extends FormContainerProps {
  variant: 'income' | 'outcome';
}

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)<FormContainerProps>`
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

export const FormContainer = styled.form<FormContainerProps>`
  ${({ theme, contrast, currentTheme }) => css`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;    

    input {
      border-radius: 8px;
      border: 0;
      background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.white};
      color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
      border: 1px solid ${contrast ? theme.contrast.highlight : theme.surface.standard};
      padding: 1rem;
      outline: 0;
      cursor: pointer;
      box-shadow: ${currentTheme === 'light' ? '0px 4px 16px 4px rgba(29, 29, 29, 0.24)' : ''};

      &::placeholder {
        color: ${theme.surface.light};
      }
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${contrast ? theme.contrast.highlight : theme.success.light};
      color: ${contrast ? theme.contrast.dark : theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 8px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:not(:disabled):hover {
        background: ${contrast ? theme.contrast.highlight : theme.success.standard};
        transition: background-color 0.2s;
      }    

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  `}
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme.text.standard};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
  ${({ theme, contrast, variant, currentTheme }) => css`
    background: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.primary.light : theme.white};
    border-radius: 8px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    color: ${contrast ? theme.contrast.dark : theme.text.standard};
    padding: 1rem;    
    box-shadow: ${currentTheme === 'light' ? '0px 4px 16px 4px rgba(29, 29, 29, 0.24)' : ''};

    svg {
      color: ${contrast ? theme.contrast.dark : variant === 'income' ? theme.success.medium : theme.error.light};
    }

    &[data-state='checked'] {
      color: ${contrast ? theme.contrast.dark : theme.white};
      background: ${contrast ? theme.contrast.highlight : variant === 'income' ? theme.success.light : theme.error.medium};
      box-shadow: none;

      svg {
        color: ${contrast ? theme.contrast.dark : theme.white};
      }
    }

    &[data-state='unchecked']:hover {
      transition: background-color 0.2s;
      background: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.primary.light : theme.white};
    }
  `}
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    color: ${props => props.theme.surface.medium};
    font-size: 0.875rem;
    line-height: 1.6;
  }
`

export const RecurrentContainer = styled.label<FormContainerProps>`
  ${({ theme, contrast }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & span {
      color: ${theme.surface.medium};
      font-size: 0.875rem;
      line-height: 1.6;
    }

    & input[type="checkbox"] {
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      margin: 0;
      padding: 0;
      border: 2px solid ${contrast ? theme.contrast.highlight : theme.surface.medium};
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      
      &:checked {
        background: ${contrast ? theme.contrast.highlight : theme.primary.standard};

        &::after {
          content: '✓';
          position: absolute;
          color: ${contrast ? theme.contrast.dark : theme.white};
          font-size: 0.875rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &:hover {
        border-color: ${contrast ? theme.yellow : theme.green};
      }
    }
  `}
`

export const ErrorMessage = styled.div`
  color: ${props => props.theme.error.light};
  font-size: 0.875rem;
  line-height: 1.6;
`
