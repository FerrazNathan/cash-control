import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
`

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: ${props => props.theme.success.light};
  }

  span {
    color: ${props => props.theme.surface.light};
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    height: 50px;
    border: 0;
    background: ${props => props.theme.text.standard};
    color: ${props => props.theme.surface.light};
    padding: 0 1rem;
    border-radius: 6px;

    &::placeholder {
      color: ${props => props.theme.surface.standard};
    }
  }

  span {
    color: ${props => props.theme.error.light};
    font-size: 0.875rem;
  }
`

export const SignInButton = styled.button`
  height: 50px;
  border: 0;
  background: ${props => props.theme.success.light};
  color: ${props => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${props => props.theme.success.standard};
    transition: background-color 0.2s;
  }
`

export const CreateAccountLink = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme.surface.light};

  a {
    color: ${props => props.theme.success.light};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`