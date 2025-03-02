import { createContext, ReactNode, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme } from '../styles/themes/darkTheme'
import { lightTheme } from '../styles/themes/lightTheme'
import { DefaultTheme } from 'styled-components'
import { GlobalStyle } from '../styles/global'
type Theme = 'light' | 'dark'

interface ThemeContextData {
  currentTheme: Theme
  contrast: boolean
  toggleTheme: () => void
  toggleContrast: () => void
  theme: DefaultTheme
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark')
  const [contrast, setContrast] = useState(false)

  function toggleTheme() {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  function toggleContrast() {
    setContrast(prev => !prev)
  }

  const theme = currentTheme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme, 
        contrast, 
        toggleTheme, 
        toggleContrast,
        theme
      }}
    >
      <StyledThemeProvider theme={theme}>
        <GlobalStyle contrast={contrast} />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
} 