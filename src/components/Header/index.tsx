import LogotipoMoney from '../../assets/LogotipoMoney.webp'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { ThemeToggle } from '../ThemeToggle'
import { useTheme } from '../../hooks/useTheme'
import { useState } from 'react'

import * as S from './styles'

export function Header() {
  const { contrast } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <S.HeaderContainer contrast={contrast}>
      <S.ContainerThemeToggle>
        <ThemeToggle />
      </S.ContainerThemeToggle>
      <S.HeaderContent>
        <S.ContainerLogo>
          <img src={LogotipoMoney} alt="Logotipo da marca" />
          <span>Cash Control</span>
        </S.ContainerLogo>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton contrast={contrast}>
              Nova Transação
            </S.NewTransactionButton>
          </Dialog.Trigger>
          
          <NewTransactionModal onClose={() => setOpen(false)} />
        </Dialog.Root>

      </S.HeaderContent>

    </S.HeaderContainer>
  )
} 