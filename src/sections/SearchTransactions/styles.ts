import styled, { css } from "styled-components";

interface InputSearchProps {
  theme: string
  contrast: boolean
  currentTheme?: string
}

interface LabelProps {
  contrast: boolean
}


export const FiltersContainer = styled.section`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 2.5rem;
`

export const ContainerSearchNameAndCategory = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
`

export const ContainerSearchMounthTypeAndPrice = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
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
      border-color: ${contrast ? theme.contrast.highlight : theme.success.medium};
    }
  `}
`

export const FilterGroup = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  `}
`

export const SelectComponent = styled.select<InputSearchProps>`
  ${({ theme, contrast, currentTheme }) => css`
    padding: 1rem;
    cursor: pointer;
    padding: 1.125rem;
    border-radius: 8px;
    border: 1px solid ${contrast ? theme.contrast.highlight : theme.surface.light};
    background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.background.medium};
    color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
    min-width: 150px;

    &:focus {
      outline: none;
      border-color: ${contrast ? theme.contrast.highlight : theme.success.medium};
    }

    option {
      background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.background.medium};
      color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
    }
  `}
`

export const PriceInputs = styled.div<InputSearchProps>`
  ${({ theme, contrast, currentTheme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      width: 100px;
      min-width: unset;
    }

    span {
      color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
      font-size: 0.875rem;
    }
  `}
`

export const ButtonSearch = styled.button<InputSearchProps>`
  ${({ theme, contrast }) => css`
    border: none;
    padding: 1rem;
    background: ${contrast ? theme.contrast.dark : 'transparent'};
    border: 1px solid ${contrast ? theme.contrast.highlight : theme.success.medium};
    color: ${contrast ? theme.contrast.highlight : theme.success.medium};
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 0.75rem;

    &:not(:disabled):hover {
      background: ${contrast ? theme.contrast.highlight : theme.success.light};
      border-color: ${contrast ? theme.contrast.highlight : theme.success.light};
      color: ${contrast ? theme.contrast.dark : theme.white};
      transition: background 0.3s ease-in-out;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      padding: 0.5rem;
      font-size: 0.875rem;
      gap: 0.5rem;

      svg {
        display: none;
      }
    }
  `}
`

export const Label = styled.label<LabelProps>`
  ${({ contrast, theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: ${contrast ? theme.contrast.standard : theme.text.medium};
    font-size: 0.875rem;
  `}
`

export const ContainerButtonClearFilters = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ClearFiltersButton = styled.button<{ contrast: boolean }>`
  ${({ theme, contrast }) => css`
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: ${contrast ? theme.contrast.highlight : theme.error.medium};
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${contrast ? theme.contrast.highlight : theme.error.medium};
      color: ${contrast ? theme.contrast.dark : theme.white};
    }
  `}
`