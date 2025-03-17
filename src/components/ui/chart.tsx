import { styled, css } from "styled-components"
import { TooltipProps as RechartsTooltipProps } from 'recharts'
import { useTheme } from "../../hooks/useTheme"

// Tipo para configuração do gráfico
export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

// Container do gráfico
export const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
`

// Props do Tooltip
interface CustomTooltipProps extends RechartsTooltipProps<any, any> {
  config?: ChartConfig
}

interface TooltipContainerProps {
  contrast: boolean
  currentTheme?: string
}

const TooltipContainer = styled.div<TooltipContainerProps>`
  ${({ theme, contrast, currentTheme }) => css`
    background: ${contrast ? theme.contrast.dark : currentTheme === 'dark' ? theme.background.standard : theme.surface.standard};
    border: 1px solid ${currentTheme === 'dark' ? theme.white : theme.surface.light};
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `}
`

const TooltipTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.standard};
`

const TooltipValue = styled.div<{ color?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  color: ${props => props.color || props.theme.text.standard};
`

// Componente do Tooltip
export function ChartTooltipContent({ 
  active, 
  payload, 
  label,
  config 
}: CustomTooltipProps) {
  const { contrast, currentTheme } = useTheme()
  if (!active || !payload?.length) return null

  return (
    <TooltipContainer contrast={contrast} currentTheme={currentTheme}>
      <TooltipTitle>Dia {label}</TooltipTitle>
      {payload.map((entry, index) => (
        <TooltipValue key={index} color={config?.[entry.dataKey as string]?.color}>
          <span>{config?.[entry.dataKey as string]?.label}:</span>
          <span>R$ {Number(entry.value).toFixed(2)}</span>
        </TooltipValue>
      ))}
    </TooltipContainer>
  )
} 