import { css, styled } from "styled-components";

interface TransactionHistoryProps {
  theme: string
  contrast: boolean
  currentTheme?: string
  }

export const Container = styled.section<TransactionHistoryProps>`
  ${({ theme, contrast, currentTheme }) => css`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 0;

    h2 {
      color: ${contrast ? theme.contrast.standard : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
      text-align: center;
      font-size: 2rem;
      font-weight: 600;
    }
  `}
`    

export const ContainerCardsChart = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`

export const CardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`

export const ContainerChart = styled.div`
  width: 100%;
`

export const Label = styled.label<TransactionHistoryProps>`
  ${({ contrast, theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: ${contrast ? theme.contrast.standard : theme.text.medium};
    font-size: 0.875rem;
    align-items: flex-end;
  `}
`

export const SelectComponent = styled.select<TransactionHistoryProps>`
  ${({ theme, contrast, currentTheme }) => css`
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid ${contrast ? theme.contrast.highlight : theme.surface.light};
    background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.background.medium};
    color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
    min-width: 150px;

    &:focus {
      outline: none;
      border-color: ${contrast ? theme.contrast.highlight : theme.success.medium};
    }

    option {
      background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.background.medium};
      color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
    }
  `}
`
