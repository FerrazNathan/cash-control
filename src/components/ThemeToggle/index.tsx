import { Sun, Moon, CircleHalf } from 'phosphor-react'
import { useTheme } from '../../hooks/useTheme'

import * as S from './styles'

export function ThemeToggle() {
  const { currentTheme, contrast, toggleTheme, toggleContrast } = useTheme()
  
  return (
    <S.ThemeToggleContainer>
      <S.ToggleButton 
        contrast={contrast}
        onClick={toggleContrast} 
        title={contrast ? 'Desativar contraste' : 'Ativar contraste'}
      >
        <CircleHalf size={20} />
      </S.ToggleButton>
      |
      <S.ToggleButton 
        contrast={contrast}
        onClick={toggleTheme} 
        title={currentTheme === 'light' ? 'Mudar para tema Dark' : 'Mudar para tema Light'}
      >
        {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </S.ToggleButton>      
    </S.ThemeToggleContainer>
  )
} 