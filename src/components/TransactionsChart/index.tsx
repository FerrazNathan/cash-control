import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "../ui/chart"
import { useTheme } from '../../hooks/useTheme'

interface TransactionsChartProps {
  period: string
  data: Array<{
    day?: number
    month?: string
    income: number
    outcome: number
  }>
  viewMode: 'monthly' | 'yearly'
}

export function TransactionsChart({ period, data, viewMode }: TransactionsChartProps) {
	const { contrast, currentTheme } = useTheme()
  const chartConfig: ChartConfig = {
    income: {
      label: "Entradas",
      color: "#00B37E"
    },
    outcome: {
      label: "Saídas",
      color: "#F75A68"
    }
  }

  const title = useMemo(() => {
    if (viewMode === 'monthly') {
      const [year, month] = period.split('-')
      return new Date(Number(year), Number(month) - 1).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
    }
    return `Ano ${period}`
  }, [period, viewMode])

  return (
    <Card contrast={contrast} currentTheme={currentTheme}>
      <CardHeader>
        <CardTitle contrast={contrast} currentTheme={currentTheme}>Transações - {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={viewMode === 'monthly' ? 'day' : 'month'}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip 
                cursor={false}
                content={(props) => <ChartTooltipContent {...props} config={chartConfig} />}
              />
              <Bar 
                dataKey="income" 
                fill={chartConfig.income.color} 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="outcome" 
                fill={chartConfig.outcome.color} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 