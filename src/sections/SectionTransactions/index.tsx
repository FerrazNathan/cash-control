import { useContext, useState } from 'react'
import { SearchTransactions } from '../SearchTransactions'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { PencilSimpleLine, Trash } from 'phosphor-react'
import { useTheme } from '../../hooks/useTheme';
import { DeleteConfirmation } from '../../components/DeleteConfirmation'

import * as S from './styles'

export function SectionTransactions() {
  const { currentTheme, contrast } = useTheme()
  const { transactions, deleteTransaction } = useContext(TransactionsContext)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null)

  async function handleDeleteTransaction(id: string) {
    setTransactionToDelete(id)
    setIsDeleteModalOpen(true)
  }

  return (
    <S.ContainerTransactions>
      <DeleteConfirmation 
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setTransactionToDelete(null)
        }}
        onConfirm={() => {
          if (transactionToDelete) {
            deleteTransaction(transactionToDelete)
            setIsDeleteModalOpen(false)
            setTransactionToDelete(null)
          }
        }}
      />

      <SearchTransactions />
      {transactions && transactions.length > 0 && (
        <S.ContainerMainGridTransactions>
          <S.GridHeader contrast={contrast} currentTheme={currentTheme}>
            <span>Nome</span>
            <span>Preço</span>
            <span>Categoria</span>
            <span>Data</span>
            <span>Ações</span>
          </S.GridHeader>

          <S.TransactionsGrid currentTheme={currentTheme} contrast={contrast}>
            {transactions.map((transaction) => {
              return (
                <S.TransactionRow
                  key={transaction.id}
                  currentTheme={currentTheme}
                  contrast={contrast}
                >
                  <S.ContainerCardTransctions>
                    <strong>Nome: </strong>
                    <span data-label="Nome">
                      {transaction.description}
                    </span>
                  </S.ContainerCardTransctions>

                  <S.ContainerCardTransctions>
                    <strong>Preço:</strong>
                    <span data-label="Preço">
                      <S.PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </S.PriceHighlight>
                    </span>
                  </S.ContainerCardTransctions>

                  <S.ContainerCardTransctions>
                    <strong>Categoria: </strong>
                    <span data-label="Categoria">
                      {transaction.category}
                    </span>
                  </S.ContainerCardTransctions>

                  <S.ContainerCardTransctions>
                    <strong>Data: </strong>
                    <span data-label="Data">
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </span>
                  </S.ContainerCardTransctions>

                  <S.ActionButtons>
                    <button title="Editar">
                      <PencilSimpleLine size={20} color={contrast ? 'yellow' : 'green'} />
                    </button>
                    <button
                      title="Excluir"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <Trash size={20} color={contrast ? 'yellow' : 'red'} />
                    </button>
                  </S.ActionButtons>
                </S.TransactionRow>
              )
            })}
          </S.TransactionsGrid>
        </S.ContainerMainGridTransactions>
      )}
    </S.ContainerTransactions>
  )
}