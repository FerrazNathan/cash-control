import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ContainerLogo = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme['gray-500']};
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const NewTransactionButton = styled.button`
  border: none;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  height: 50px;
  font-weight: 700;
  padding: 0 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["green-700"]};
    transition: background 0.3s ease-in-out;
  }
`