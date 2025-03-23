import styled, { css } from 'styled-components';

interface PageButtonProps {
  isActive?: boolean;
  contrast?: boolean;
  disabled?: boolean;
  currentTheme?: string;
}

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
`;

export const PageButton = styled.button<PageButtonProps>`
  ${({ theme, isActive, contrast, disabled }) => css`
    padding: 0.5rem;
    border-radius: 50%;
    border: 1px solid ${contrast ? theme.contrast.highlight : theme.text.standard};
    background: ${contrast ? theme.contrast.dark : isActive ? theme.primary.light : 'transparent'};
    color: ${contrast ? theme.contrast.highlight : isActive ? theme.white : theme.text.standard};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? 0.5 : 1};
    min-width: 2rem;
    min-height: 2rem;
    font-size: 0.875rem;
    font-weight: 700;

    &:hover:not(:disabled) {
      background: ${contrast ? theme.contrast.highlight : theme.primary.light};
      color: ${contrast ? theme.contrast.dark : theme.white};
    }
  `}
`;

export const Ellipsis = styled.span<PageButtonProps>`
  color: ${({ theme, contrast }) => contrast ? theme.contrast.standard : theme.text.standard};
  padding: 0 0.5rem;
`; 

export const ButtonArrow = styled.button<PageButtonProps>`
  ${({ disabled }) => css`
    background: none;
    border: none;
		line-height: 0;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
  `}
`;

