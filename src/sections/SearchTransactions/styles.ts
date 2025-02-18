import styled from "styled-components";

export const SearchTransactionsContainer = styled.form`
  display: flex;
  gap: 1rem;
`

export const InputSearch = styled.input`
  flex: 1;
  border-radius: 8px;
  border:  none;
  background: ${(props) => props.theme["gray-900"]};
  color: ${(props) => props.theme["gray-300"]};
  padding: 1rem;
  cursor: pointer;

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }
`

export const ButtonSearch = styled.button`
  border: none;
  padding: 1rem;
  background: transparent;
  border: 1px solid ${(props) => props.theme["green-300"]};
  color: ${(props) => props.theme["green-300"]};
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: ${(props) => props.theme["green-500"]};
    border-color: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme.white};
    transition: background 0.3s ease-in-out;
  }
`