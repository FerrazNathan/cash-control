import { BrowserRouter } from 'react-router-dom'
import { TransactionsProvider } from "./contexts/TransactionsContext"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Router } from './Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
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
