import styled from "styled-components";

interface PriceHighlightProps {
  variant: "income" | "outcome"
}

export const ContainerTransactions = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme["gray-700"]};

    &:first-child {
      border-radius: 8px 0 0 8px;
      width: 50%;
    }

    &:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) => props.variant === "income" ? props.theme["green-300"] : props.theme["red-300"]}
`