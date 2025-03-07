import { css, styled } from "styled-components";

interface PriceHighlightProps {
  variant: 'income' | 'outcome';
}

interface InputSearchProps {
theme: string
contrast: boolean
currentTheme?: string
}

export const Container = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`       

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
`

export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
//   flex-direction: column;
`

export const ContainerFilterNameCategoryAndMounths = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`

export const ContainerFilterTypeAndPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    color: ${props => props.theme.surface.medium};
    font-size: 0.875rem;
    line-height: 1.6;
  }
`

export const InputSearch = styled.input<InputSearchProps>`
  ${({ theme, contrast, currentTheme }) => css`
    flex: 1;
    border-radius: 8px;
    border: 1px solid ${contrast ? theme.contrast.highlight : theme.surface.light};
    background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.background.medium};
    color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
    padding: 1rem;
    cursor: pointer;

    &::placeholder {
      color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.surface.standard : theme.surface.light};
    }

    &:focus {
      outline: none;
    }
  `}
`

export const Content = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme['gray-800']};
  padding: 1.5rem;
  border-radius: 6px;
`

export const DayGroup = styled.div`
  margin-bottom: 1.5rem;
`

export const DayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

export const DayTransactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Transaction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme['gray-700']};
`

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TransactionCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme['gray-700']};
`

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ theme, variant }) => variant === 'income' ? theme['green-300'] : theme['red-300']};
`

export const TypeFilter = styled.div`
  select {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid ${props => props.theme.border};
    background: ${props => props.theme.surface.base};
    color: ${props => props.theme.text};
    cursor: pointer;
    transition: border-color 0.2s;
    min-width: 120px;

    &:hover {
      border-color: ${props => props.contrast ? props.theme.yellow : props.theme.green};
    }

    option {
      background: ${props => props.theme.surface.base};
      color: ${props => props.theme.text};
    }
  }
`

export const PriceFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 120px;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid ${props => props.theme.border};
    background: ${props => props.theme.surface.base};
    color: ${props => props.theme.text};
  }

  span {
    color: ${props => props.theme.text};
  }
`

