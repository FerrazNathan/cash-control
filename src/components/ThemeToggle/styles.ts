import styled, { css } from 'styled-components'

interface ToggleButtonProps {
  contrast?: boolean
}

export const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`


export const ToggleButton = styled.button<ToggleButtonProps>`
  ${({ contrast, theme }) => css`
    background: transparent;
    border: 0;
    color: ${theme.text.light};
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    line-height: 0;
    transition: all 0.2s;
    color: ${contrast && theme.contrast.highlight};
  `}
` 