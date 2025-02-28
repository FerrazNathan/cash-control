import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
`

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: ${props => props.theme['green-500']};
  }

  span {
    color: ${props => props.theme['gray-300']};
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
    background: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-300']};
    padding: 0 1rem;
    border-radius: 6px;

    &::placeholder {
      color: ${props => props.theme['gray-500']};
    }
  }

  span {
    color: ${props => props.theme['red-300']};
    font-size: 0.875rem;
  }
`

export const SignInButton = styled.button`
  height: 50px;
  border: 0;
  background: ${props => props.theme['green-500']};
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
    background: ${props => props.theme['green-700']};
    transition: background-color 0.2s;
  }
`

export const CreateAccountLink = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme['gray-300']};

  a {
    color: ${props => props.theme['green-500']};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`