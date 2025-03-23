import styled, { css } from "styled-components";

interface SummaryCardProps {
  variant?: 'positive' | 'negative';
  contrast: boolean;
}

interface ContainerSummaryProps {
  investmentsCheck?: boolean;
}

export const ContainerSummary = styled.section<ContainerSummaryProps>`
  ${({ investmentsCheck }) => css`
    width: 100%;
    max-width: 1360px;
    margin: 0 auto;
    padding: 0 1.5rem;

    display: grid;
    grid-template-columns: repeat(${investmentsCheck ? 4 : 3}, 1fr);
    overflow-x: auto;
    gap: 1rem;
    margin-top: 2rem;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `}
`

export const SummaryCard = styled.div<SummaryCardProps>`
  ${({ theme, contrast, variant }) => css`
    background: ${contrast ? theme.contrast.dark : theme.primary.light};
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: ${theme.white};

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    strong {
      display: block;
      font-size: 2rem;
      white-space: nowrap;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    ${variant === 'positive' && css`
      background: ${contrast ? theme.contrast.dark : theme.success.standard};
    `}

    ${variant === 'negative' && css`
      background: ${contrast ? theme.contrast.dark : theme.error.medium};
    `}
  `}
`