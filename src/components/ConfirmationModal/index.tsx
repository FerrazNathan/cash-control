import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useTheme } from '../../hooks/useTheme'

import * as S from './styles'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({
  isOpen,
  onClose,
  title,
  children
}: ModalProps) {
  const { contrast } = useTheme()
  
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <S.Overlay>
          <Dialog.Content asChild onEscapeKeyDown={onClose}>
            <S.Content>
              <Dialog.Title>{title}</Dialog.Title>
              <S.CloseButton onClick={onClose} contrast={contrast}>
                <X size={24} />
              </S.CloseButton>

              {children}
            </S.Content>
          </Dialog.Content>
        </S.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}