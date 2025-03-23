import styled, { css } from "styled-components";

interface HeaderContainerProps {  
  contrast: boolean
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  ${({ theme, contrast }) => css`
    background: ${contrast ? theme.contrast.dark : theme.background.standard};
    padding: 0.5rem 0 2rem;
    border-bottom: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};
  `}
`

export const ContainerThemeToggle = styled.div`
  width: auto;
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  border-bottom: 1px solid ${(props) => props.theme.surface.standard};
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media(max-width: 480px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`

export const ContainerLogo = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.white};
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

export const ContainerUserSwitch = styled.button<HeaderContainerProps>`  
  ${({ theme, contrast }) => css`
    background: none;
    border: none;
    cursor: pointer;
    color: ${theme.white};
    color: ${contrast && theme.contrast.highlight};
  `}
`

export const ContainerLinks = styled.div<HeaderContainerProps>`
  ${({ theme, contrast }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    a {
      text-decoration: none;
      color: ${contrast ? theme.contrast.highlight : theme.white};
    }

    &:hover {
      text-decoration: underline;
    }
  `}
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

export const ContainerConfirmButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`

export const ButtonDefault = styled.button`
  border: none;
  cursor: pointer;
  color: ${props => props.theme.white};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.3s ease-in-out;
`

export const ButtonSuccess = styled(ButtonDefault)<HeaderContainerProps>`
  ${({ theme, contrast }) => css`
    background: ${contrast ? theme.contrast.highlight : theme.success.light};
    color: ${contrast ? theme.contrast.dark : theme.white};

    &:hover {
      background: ${contrast ? theme.contrast.highlight : theme.success.standard};
      color: ${contrast ? theme.contrast.dark : theme.white};
    }
  `}
`

export const ButtonDanger = styled(ButtonDefault)<HeaderContainerProps>`
  ${({ theme, contrast }) => css`
    background: ${contrast ? theme.contrast.highlight : theme.error.light};
    color: ${contrast ? theme.contrast.dark : theme.white};

    &:hover {
      background: ${contrast ? theme.contrast.highlight : theme.error.standard};
      color: ${contrast ? theme.contrast.dark : theme.white};
    }
  `}
`
