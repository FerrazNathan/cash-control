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

