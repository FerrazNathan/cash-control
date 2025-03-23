import styled, { css } from "styled-components";

interface PriceHighlightProps {
  variant: "income" | "outcome"
}

interface TransactionsGridProps {
  currentTheme: string
  contrast: boolean
}

interface ScrollPageButtonProps {
  isActive?: boolean
  contrast: boolean
}

export const ContainerTransactions = styled.main`
  width: 100%;
  max-width: 1360px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
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

    color: ${contrast ? theme.contrast.standard : currentTheme === 'dark' ? theme.text.light : theme.text.medium};

    @media (max-width: 768px) {
      display: none;
    }
  `}
`

export const TransactionsGrid = styled.div<TransactionsGridProps>`
  ${({ theme, contrast, currentTheme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;    
    min-width: 768px;
    color: ${contrast ? theme.contrast.standard : currentTheme === 'dark' ? theme.text.light : theme.text.medium};

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 768px) {
      min-width: inherit;
      align-items: center;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  `}
`

export const ContainerCardTransctions = styled.div`
  display: flex;
  gap: 0.5rem;

  & span {
    text-transform: capitalize;
  }

  @media (min-width: 768px) {
    strong {
      display: none;
    }
  }
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
    position: relative;
    width: 100%;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 1rem;
    }
  `}
`

export const ActionButtons = styled.div`
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
  }
`

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) => props.variant === "income" ? props.theme.success.medium : props.theme.error.light}
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`

export const ScrollPageButton = styled.button<ScrollPageButtonProps>`
  ${({ theme, contrast, isActive }) => css`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    background: ${contrast ? theme.contrast.highlight : isActive ? theme.success.light : theme.surface.standard};
    color: ${contrast ? theme.contrast.dark : theme.text.standard};
    cursor: pointer;
    transition: filter 0.2s;

    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      filter: brightness(0.9);
    }
  `})
`

export const RecurrentBadge = styled.span`
  position: absolute;
  left: 14%;
  top: 10%;
  transform: translateY(-50%);
  background: #42A5F5;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  max-width: 150px;

  @media (max-width: 768px) {
    left: inherit;
    right: 2%;
    top: 3%;
  }
`