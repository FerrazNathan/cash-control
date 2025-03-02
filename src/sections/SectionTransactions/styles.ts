import styled, { css } from "styled-components";

interface PriceHighlightProps {
  variant: "income" | "outcome"
}

interface TransactionsTableProps {
  currentTheme: string
  contrast: boolean
}

export const ContainerTransactions = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table<TransactionsTableProps>`
  ${({ theme, contrast, currentTheme }) => css`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    tr {
      background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.primary.medium : theme.surface.standard};
      box-shadow: 0 0 0 1px ${contrast ? theme.contrast.standard : 'transparent'};
      overflow: hidden;
    }

    td {
      padding: 1.25rem 2rem;
      color: ${contrast ? theme.contrast.standard : theme.surface.medium};

      &:first-child {
        border-radius: 8px 0 0 8px;
        width: 50%;
      }'

      &:last-child {
        border-radius: 0 8px 8px 0;
      }
    }
  `}
`

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) => props.variant === "income" ? props.theme.success.medium : props.theme.error.light}
`