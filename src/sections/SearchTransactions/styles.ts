import styled, { css } from "styled-components";

interface InputSearchProps {
  theme: string
  contrast: boolean
  currentTheme?: string
}

export const SearchTransactionsContainer = styled.form`
  display: flex;
  gap: 1rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
`

export const InputSearch = styled.input<InputSearchProps>`
  ${({ theme, contrast, currentTheme }) => css`
    flex: 1;
    border-radius: 8px;
    border: 1px solid ${contrast ? theme.contrast.highlight : 'transparent'};
    background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.background.medium};
    color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.text.light : theme.text.standard};
    padding: 1rem;
    cursor: pointer;
    box-shadow: 0px 4px 16px 4px rgba(29, 29, 29, 0.24);

    &::placeholder {
      color: ${contrast ? theme.contrast.highlight : currentTheme === 'dark' ? theme.surface.standard : theme.surface.light};
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