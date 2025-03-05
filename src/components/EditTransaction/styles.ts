import styled from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome';
}

export const FormContainer = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    border-radius: 6px;
    border: 0;
    background: ${props => props.theme.background.standard};
    color: ${props => props.theme.text.light};
    padding: 1rem;

    &::placeholder {
      color: ${props => props.theme.surface.standard};
    }
  }

  button[type="submit"] {
    height: 58px;
    border: 0;
    background: ${props => props.theme.success.light};
    color: ${props => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 8px;
    margin-top: 1.5rem;
    cursor: pointer;

    &:not(:disabled):hover {
      background: ${props => props.theme.success.standard};
      transition: background-color 0.2s;
    }    

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
  background: ${props => props.theme.primary.medium};
  border-radius: 8px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${props => props.theme.text.light};
  padding: 1rem;

  svg {
    color: ${props => props.variant === 'income' ? props.theme.success.medium : props.theme.error.light};
  }

  &[data-state='checked'] {
    color: ${props => props.theme.white};
    background: ${props => props.variant === 'income' ? props.theme.success.light : props.theme.error.medium};
    box-shadow: none;

    svg {
      color: ${props => props.theme.white};
    }
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.2s;
    background: ${props => props.theme.primary.light};
  }
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

export const RecurrentContainer = styled.label`
  display: flex;
  gap: 0.5rem;
`

export const ErrorMessage = styled.div`
  color: ${props => props.theme.error.light};
  font-size: 0.875rem;
  line-height: 1.6;
`
