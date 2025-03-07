import { Routes, Route, Navigate } from 'react-router-dom'
import { SignIn } from './pages/SignIn/index'
import { Register } from './pages/Register/index'
import { Transactions } from './pages/Transactions'
import { History } from './pages/History'
import { useAuth } from './hooks/useAuth'
import { DefaultLayout } from './layouts/DefaultLayout'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route 
          path="/transactions" 
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          } 
        />
      </Route>
    </Routes>
  )
} 