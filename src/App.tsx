import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "styled-components"
// import { defaultTheme } from "./styles/themes/themeDefault"
import { darkTheme } from "./styles/themes/darkTheme"
import { GlobalStyle } from "./styles/global"
import { TransactionsProvider } from "./contexts/TransactionsContext"
import { AuthProvider } from "./contexts/AuthContext"
import { Router } from './Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <AuthProvider>
          <TransactionsProvider>
            <Router />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </TransactionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
