import React, { useContext, useState } from 'react'
import { SearchTransactions } from '../SearchTransactions'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { PencilSimpleLine, Trash } from 'phosphor-react'
import { useTheme } from '../../hooks/useTheme';
import { DeleteConfirmation } from '../../components/DeleteConfirmation'
import { Transaction } from '../../@types/transactionForm'
import { EditTransaction } from '../../components/EditTransaction'

import * as S from './styles'

export function SectionTransactions() {
  const { currentTheme, contrast } = useTheme()
  const { transactions, deleteTransaction } = useContext(TransactionsContext)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calcula o índice inicial e final dos itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem)
  
  // Calcula o total de páginas
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  async function handleDeleteTransaction(id: string) {
    setTransactionToDelete(id)
    setIsDeleteModalOpen(true)
  }

  function handleOpenEditModal(transaction: Transaction) {
    setTransactionToEdit(transaction)
    setIsEditModalOpen(true)
  }

  function handleCloseEditModal() {
    setTransactionToEdit(null)
    setIsEditModalOpen(false)
  }

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber)
  }
  
  console.log(transactions, 'transactions')
  
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

      {transactions && transactions.length > 0 && (
        <React.Fragment>
          <SearchTransactions />
          <S.ContainerMainGridTransactions>
            <S.GridHeader contrast={contrast} currentTheme={currentTheme}>
              <span>Nome</span>
              <span>Preço</span>
              <span>Categoria</span>
              <span>Data</span>
              <span>Ações</span>
            </S.GridHeader>

          <S.TransactionsGrid currentTheme={currentTheme} contrast={contrast}>
            {currentTransactions.map((transaction) => {
              return (
                <S.TransactionRow
                  key={transaction.id}
                  currentTheme={currentTheme}
                  contrast={contrast}
                >
                  <S.ContainerCardTransctions>
                    <strong>Nome: </strong>
                    <span data-label="Nome">
                      {transaction.name}
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
                    <button 
                      title="Editar"
                      onClick={() => handleOpenEditModal(transaction)}
                    >
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
        </React.Fragment>
      )}

      {transactionToEdit && (
        <EditTransaction
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          transaction={transactionToEdit}
        />
      )}

      {totalPages > 1 && (
        <S.PaginationContainer>
          <S.ScrollPageButton 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            contrast={contrast}
          >
            Anterior
          </S.ScrollPageButton>
          
          {Array.from({ length: totalPages }, (_, index) => (
            <S.ScrollPageButton
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              isActive={currentPage === index + 1}
              contrast={contrast}
            >
              {index + 1}
            </S.ScrollPageButton>
          ))}

          <S.ScrollPageButton 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            contrast={contrast}
          >
            Próximo
          </S.ScrollPageButton>
        </S.PaginationContainer>
      )}
    </S.ContainerTransactions>
  )
}