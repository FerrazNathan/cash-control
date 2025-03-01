import styled from "styled-components";

export const SearchTransactionsContainer = styled.form`
  display: flex;
  gap: 1rem;
`

export const InputSearch = styled.input`
  flex: 1;
  border-radius: 8px;
  border:  none;
  background: ${(props) => props.theme.background.standard};
  color: ${(props) => props.theme.text.light};
  padding: 1rem;
  cursor: pointer;

  &::placeholder {
    color: ${(props) => props.theme.surface.standard};
  }
`

export const ButtonSearch = styled.button`
  border: none;
  padding: 1rem;
  background: transparent;
  border: 1px solid ${(props) => props.theme.success.medium};
  color: ${(props) => props.theme.success.medium};
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:not(:disabled):hover {
    background: ${(props) => props.theme.success.light};
    border-color: ${(props) => props.theme.success.light};
    color: ${(props) => props.theme.white};
    transition: background 0.3s ease-in-out;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`