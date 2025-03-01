import styled, { css } from "styled-components";

interface SummaryCardProps {
  variant?: 'positive' | 'negative';
}

export const ContainerSummary = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;
`

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme.primary.light};
  border-radius: 8px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.text.light});
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  ${(props) => props.variant === 'positive' && css`
    background: ${(props) => props.theme.success.standard};
  `}

  ${(props) => props.variant === 'negative' && css`
    background: ${(props) => props.theme.error.medium};
  `}
`