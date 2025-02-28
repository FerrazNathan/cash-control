import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/themeDefault"
import { GlobalStyle } from "./styles/global"
import { TransactionsProvider } from "./contexts/TransactionsContext"
import { AuthProvider } from "./contexts/AuthContext"
import { Router } from './Router'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <AuthProvider>
          <TransactionsProvider>
            <Router />
          </TransactionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
