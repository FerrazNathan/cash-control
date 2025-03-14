import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "../ui/chart"
import { useTheme } from '../../hooks/useTheme'

interface TransactionsChartProps {
  month: string
  transactions: {
    day: number
    income: number
    outcome: number
  }[]
}

export function TransactionsChart({ month, transactions }: TransactionsChartProps) {
	const { contrast, currentTheme } = useTheme()
  const [year, monthNum] = month.split('-')
  const daysInMonth = new Date(Number(year), Number(monthNum), 0).getDate()
  
  const chartData = useMemo(() => {
    return Array.from({ length: daysInMonth }).map((_, index) => {
      const day = index + 1
      const dayTransactions = transactions.find(t => t.day === day) || { income: 0, outcome: 0 }
      
      return {
        day,
        income: dayTransactions.income,
        outcome: dayTransactions.outcome
      }
    })
  }, [daysInMonth, transactions])

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

  const monthDate = new Date(Number(year), Number(monthNum) - 1)
  const monthTitle = monthDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <Card contrast={contrast} currentTheme={currentTheme}>
      <CardHeader>
        <CardTitle contrast={contrast} currentTheme={currentTheme}>Transações do Mês</CardTitle>
        <CardDescription contrast={contrast} currentTheme={currentTheme}>{monthTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
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