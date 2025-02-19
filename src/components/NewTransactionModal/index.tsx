import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as S from './styles'
import * as Dialog from '@radix-ui/react-dialog'


export function NewTransactionModal() {
  return (
    <Dialog.Portal> {/* Renderiza o conteúdo do modal no final do DOM (fora da hierarquia atual) para evitar problemas de z-index */}
      <S.Overlay /> {/* Camada escura de fundo que fica por trás do modal */}
      <S.Content> {/* Container principal do conteúdo do modal */}
        <Dialog.Title>Nova Transação</Dialog.Title> {/* Título do modal - importante para acessibilidade */}
        <S.CloseButton> {/* Botão de fechar o modal - pode ser personalizado com asChild também */}
          <X size={24} />
        </S.CloseButton>

        <S.FormContainer>
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

          <S.TransactionType>
            <S.TransactionTypeButton variant="income" value="income" >
              <ArrowCircleUp size={24} />
              Entrada
            </S.TransactionTypeButton>

            <S.TransactionTypeButton variant="outcome" value="outcome" >
              <ArrowCircleDown size={24} />
              Saída
            </S.TransactionTypeButton>
          </S.TransactionType>

          <button type="submit">Cadastrar</button>
        </S.FormContainer>
        
      </S.Content>
    </Dialog.Portal>
  )
}