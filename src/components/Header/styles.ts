import styled, { css } from "styled-components";

interface HeaderContainerProps {  
  contrast: boolean
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  ${({ theme, contrast }) => css`
    background: ${contrast ? theme.contrast.dark : theme.background.standard};
    padding: 0.5rem 0 7.5rem;
    border-bottom: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};
  `}
`

export const ContainerThemeToggle = styled.div`
  width: auto;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;

  border-bottom: 1px solid ${(props) => props.theme.surface.standard};
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ContainerLogo = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.surface.standard};
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
`

export const NewTransactionButton = styled.button<HeaderContainerProps>`
  ${({ theme, contrast }) => css`
    border: none;
    background: ${contrast ? theme.contrast.dark : theme.success.light};
    color: ${contrast ? theme.contrast.highlight : theme.white};
    border: 1px solid ${contrast ? theme.contrast.highlight : 'transparent'};
    height: 50px;
    font-weight: 700;
    padding: 0 1.25rem;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background: ${contrast ? theme.contrast.highlight : theme.success.standard};
      color: ${contrast ? theme.contrast.dark : theme.white};
      transition: background 0.3s ease-in-out;
    }

    @media(max-width: 768px) {
      padding: 0.5rem;
      font-size: 0.875rem;
    }
  `}
`