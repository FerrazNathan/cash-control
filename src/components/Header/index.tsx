import LogotipoMoney from '../../assets/LogotipoMoney.webp'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'

import * as S from './styles'

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.ContainerLogo>
          <img src={LogotipoMoney} alt="Logotipo da marca" />
          <span>Cash Control</span>
        </S.ContainerLogo>

        <Dialog.Root> {/* Componente pai que controla o estado do modal (aberto/fechado) */}
          <Dialog.Trigger asChild>{/* Função de abrir o Modal, quando passo asChild, indico que ele precisa aproveitar o botão como children e não ser um botão em si. */}
            <S.NewTransactionButton>Nova Transação</S.NewTransactionButton>
          </Dialog.Trigger>
          
          <NewTransactionModal />
        </Dialog.Root>

      </S.HeaderContent>

    </S.HeaderContainer>
  )
} 