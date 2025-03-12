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

    h2 {
      color: ${contrast ? theme.contrast.standard : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
    }
  `}
`    

export const CardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`


