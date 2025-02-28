import { createContext, ReactNode, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

interface User {
  id: string
  email: string | null
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  signIn: (credentials: SignInCredentials) => Promise<void>
  signUp: (credentials: SignInCredentials) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      setUser({
        id: result.user.uid,
        email: result.user.email
      })
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw new Error('Erro ao fazer login')
    }
  }

  async function signUp({ email, password }: SignInCredentials) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      setUser({
        id: result.user.uid,
        email: result.user.email
      })
    } catch (error) {
      console.error('Erro ao criar conta:', error)
      throw new Error('Erro ao criar conta')
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw new Error('Erro ao fazer logout')
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        signIn, 
        signUp, 
        logout, 
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
} 