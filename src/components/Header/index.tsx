import React from 'react'
import LogotipoMoney from '../../assets/LogotipoMoney.webp'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { ThemeToggle } from '../ThemeToggle'
import { Modal } from '../Modal'
import { useTheme } from '../../hooks/useTheme'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UserSwitch } from 'phosphor-react'

import * as S from './styles'

export function Header() {
  const { contrast } = useTheme()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const isTransactionsPage = location.pathname === '/transactions'
  const isHistoryPage = location.pathname === '/history'

  function handleOpenConfirmModal() {
    setIsConfirmModalOpen(true)
  }

  function handleCloseConfirmModal() {
    setIsConfirmModalOpen(false)
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        title="Deseja realmente sair do sistema?"
      >
        <S.ContainerConfirmButtons>
          <S.ButtonDanger
            onClick={handleCloseConfirmModal}
            contrast={contrast}
          >
            Não
          </S.ButtonDanger>
          <S.ButtonSuccess
            onClick={() => {
              handleCloseConfirmModal()
              window.location.href = '/'
            }}
            contrast={contrast}
          >
            Sim
          </S.ButtonSuccess>
        </S.ContainerConfirmButtons>
      </Modal>

      <S.HeaderContainer contrast={contrast}>
        <S.ContainerThemeToggle>
          <ThemeToggle />
          <S.ContainerUserSwitch
            contrast={contrast}
            title="Sair"
            onClick={() => handleOpenConfirmModal()}
          >
            <UserSwitch size={24} />
          </S.ContainerUserSwitch>
        </S.ContainerThemeToggle>

        <S.HeaderContent>
          <S.ContainerLogo>
            <img src={LogotipoMoney} alt="Logotipo da marca" />
            <span>Cash Control</span>
          </S.ContainerLogo>

          <S.ContainerLinks contrast={contrast}>
            {isTransactionsPage && (
              <a href="/history">Ir Para Histórico</a>
            )}
            {isHistoryPage && (
              <a href="/transactions">Ir Para Transações</a>
            )}
          </S.ContainerLinks>

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
    </React.Fragment>
  )
} 