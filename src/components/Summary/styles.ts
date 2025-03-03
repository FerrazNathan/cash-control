import styled, { css } from "styled-components";

interface SummaryCardProps {
  variant?: 'positive' | 'negative';
  contrast: boolean;
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

  @media (max-width: 768px) {
    gap: 1rem;
    overflow-x: scroll;

    scrollbar-width: none; /* Para Firefox */
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const SummaryCard = styled.div<SummaryCardProps>`
  ${({ theme, contrast, variant }) => css`
    background: ${contrast ? theme.contrast.dark : theme.primary.light};
    border-radius: 8px;
    padding: 2rem;
    border: 1px solid ${contrast ? theme.contrast.standard : 'transparent'};

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${theme.text.light});
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
    }

    ${variant === 'positive' && css`
      background: ${contrast ? theme.contrast.dark : theme.success.standard};
    `}

    ${variant === 'negative' && css`
      background: ${contrast ? theme.contrast.dark : theme.error.medium};
    `}

    @media (max-width: 768px) {
      padding: 1rem;
    }
  `}
`