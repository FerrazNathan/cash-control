import { useContext, useState, useEffect } from 'react'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useTheme } from '../../hooks/useTheme'
import { z } from 'zod'

import * as S from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchTransactions() {
  const { getTransactions } = useContext(TransactionsContext)
  const { currentTheme, contrast } = useTheme()

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date()
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
  })
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'outcome'>('all')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [searchTerm, setSearchTerm] = useState('')

  const handleClearFilters = () => {
    setSelectedMonth(() => {
      const today = new Date()
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
    })
    setSelectedType('all')
    setPriceRange({ min: '', max: '' })
    setSearchTerm('')
    getTransactions({}) // Busca sem filtros
  }

  // Função para aplicar todos os filtros
  const applyFilters = async () => {
    await getTransactions({
      query: searchTerm || undefined,
      month: selectedMonth,
      type: selectedType,
      priceRange: {
        min: priceRange.min ? Number(priceRange.min) : undefined,
        max: priceRange.max ? Number(priceRange.max) : undefined,
      }
    })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedMonth, selectedType, priceRange])

  return (
    <S.FiltersContainer>
      <S.ContainerSearchNameAndCategory>
        <S.Label contrast={contrast}>Busca por nome ou categoria</S.Label>
        <S.InputSearch
          type="text"
          placeholder="Buscar por nome ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          currentTheme={currentTheme}
          contrast={contrast}
        />
      </S.ContainerSearchNameAndCategory>

      <S.ContainerSearchMounthTypeAndPrice>
        <S.FilterGroup>
          <S.Label contrast={contrast}>Busca por mês</S.Label>
          <S.InputSearch
            type="month"
            currentTheme={currentTheme}
            contrast={contrast}
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          />
        </S.FilterGroup>

        <S.FilterGroup>
          <S.Label contrast={contrast}>Busca por Tipo de Transação</S.Label>
          <S.SelectComponent
            value={selectedType}
            onChange={e => setSelectedType(e.target.value as 'all' | 'income' | 'outcome')}
            currentTheme={currentTheme}
            contrast={contrast}
          >
            <option value="all">Todos</option>
            <option value="income">Entradas</option>
            <option value="outcome">Saídas</option>
          </S.SelectComponent>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.Label contrast={contrast}>Busca por Faixa de Preço</S.Label>
          <S.PriceInputs currentTheme={currentTheme} contrast={contrast}>
            <S.InputSearch
              type="number"
              placeholder="Min"
              currentTheme={currentTheme}
              contrast={contrast}
              value={priceRange.min}
              onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            />
            <span>até</span>
            <S.InputSearch
              type="number"
              placeholder="Max"
              currentTheme={currentTheme}
              contrast={contrast}
              value={priceRange.max}
              onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            />
          </S.PriceInputs>
        </S.FilterGroup>
      </S.ContainerSearchMounthTypeAndPrice>
      <S.ContainerButtonClearFilters>
        <S.ClearFiltersButton
          type="button"
          onClick={handleClearFilters}
          contrast={contrast}
        >
          Limpar Filtros
        </S.ClearFiltersButton>
      </S.ContainerButtonClearFilters>
    </S.FiltersContainer>
  )
}