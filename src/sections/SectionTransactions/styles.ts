import styled, { css } from "styled-components";

interface PriceHighlightProps {
  variant: "income" | "outcome"
}

interface TransactionsGridProps {
  currentTheme: string
  contrast: boolean
}

export const ContainerTransactions = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const ContainerMainGridTransactions = styled.div`
  width: 100%;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding-bottom: 1rem;
  }
`

export const GridHeader = styled.div<TransactionsGridProps>`
  ${({ theme, contrast, currentTheme }) => css`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
    gap: 1rem;
    padding-left: 2rem;
    align-items: center;
    margin-bottom: 0.5rem;
    font-weight: 600;
    min-width: 768px;
    margin-top: 1.5rem;

    color: ${contrast ? theme.contrast.standard : currentTheme === 'dark' ? theme.text.light : theme.text.medium};
  `}
`

export const TransactionsGrid = styled.div<TransactionsGridProps>`
  ${({ theme, contrast, currentTheme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;    
    max-height: 600px;
    overflow-y: auto;
    min-width: 768px; // Mesma largura mínima do header
    color: ${contrast ? theme.contrast.standard : currentTheme === 'dark' ? theme.text.light : theme.text.medium};
  `}
`

export const TransactionRow = styled.div<TransactionsGridProps>`
  ${({ theme, contrast, currentTheme }) => css`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
    padding: 1.25rem 2rem;
    gap: 1rem;
    align-items: center;
    background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.primary.medium : theme.surface.standard};
    border: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};
    border-radius: 8px;
  `}
`

export const ActionButtons = styled.div<TransactionsGridProps>`
  ${({ theme, contrast, currentTheme }) => css`
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;

    button {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: all 0.2s;

      & svg {
        color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : 'none'};
      }
    }
  `}
`

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) => props.variant === "income" ? props.theme.success.medium : props.theme.error.light}
`