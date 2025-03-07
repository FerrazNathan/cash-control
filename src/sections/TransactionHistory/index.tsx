import { useState } from 'react'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useTheme } from '../../hooks/useTheme'

import * as S from './styles'

export function TransactionHistory() {
	const { contrast, currentTheme } = useTheme()
	const [selectedMonth, setSelectedMonth] = useState(() => {
		const today = new Date()
		return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
	})
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedType, setSelectedType] = useState<'all' | 'income' | 'outcome'>('all')
	const [priceRange, setPriceRange] = useState({ min: '', max: '' })

	const { transactions } = useContext(TransactionsContext)

	const filteredTransactions = transactions.filter(transaction => {
		const transactionDate = new Date(transaction.createdAt)
		const transactionMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`

		const matchesMonth = transactionMonth === selectedMonth
		const matchesSearch = searchTerm === '' ||
			transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesType = selectedType === 'all' || transaction.type === selectedType
		const matchesPrice = (
			(priceRange.min === '' || transaction.price >= Number(priceRange.min)) &&
			(priceRange.max === '' || transaction.price <= Number(priceRange.max))
		)

		return matchesMonth && matchesSearch && matchesType && matchesPrice
	})

	// Agrupa transações por dia
	const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
		const date = new Date(transaction.createdAt).toISOString().split('T')[0]
		if (!groups[date]) {
			groups[date] = []
		}
		groups[date].push(transaction)
		return groups
	}, {} as Record<string, typeof filteredTransactions>)

	console.log(transactions, 'transactions')
	
	return (
		<S.Container>
			<S.Header>
				<h2>Histórico de Transações</h2>

				<S.Filters>
					<S.ContainerFilterNameCategoryAndMounths>
						<span>Nome ou categoria</span>
						<S.InputSearch
							type="text"
							placeholder="Buscar por nome ou categoria..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							currentTheme={currentTheme}
							contrast={contrast}
							title='Nome ou categoria'
						/>

						<span>Mês</span>
						<S.InputSearch
							type="month"
							value={selectedMonth}
							currentTheme={currentTheme}
							contrast={contrast}
							onChange={e => setSelectedMonth(e.target.value)}
							title='Mês'
						/>
					</S.ContainerFilterNameCategoryAndMounths>

					<S.ContainerFilterTypeAndPrice>
						<S.TypeFilter>
							<span>Tipo de transação</span>
							<select
								value={selectedType}
								onChange={(e) => setSelectedType(e.target.value as 'all' | 'income' | 'outcome')}
								contrast={contrast}
							>
								<option value="all">Todos</option>
								<option value="income">Entradas</option>
								<option value="outcome">Saídas</option>
							</select>
						</S.TypeFilter>

						<S.PriceFilter>
							<span>Range de Preço</span>
							<S.InputSearch
								type="number"
								placeholder="Preço mínimo"
								value={priceRange.min}
								onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
							/>
							<span>até</span>
							<S.InputSearch
								type="number"
								placeholder="Preço máximo"
								value={priceRange.max}
								onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
							/>
						</S.PriceFilter>
					</S.ContainerFilterTypeAndPrice>
				</S.Filters>
			</S.Header>

			<S.Content>
				{Object.entries(groupedTransactions)
					.sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
					.map(([date, dayTransactions]) => (
						<S.DayGroup key={date}>
							<S.DayHeader>
								<h2>{dateFormatter.format(new Date(date))}</h2>
								<span>
									{dayTransactions.length}
									{dayTransactions.length === 1 ? ' transação' : ' transações'}
								</span>
							</S.DayHeader>

							<S.TransactionsList>
								{dayTransactions.map(transaction => (
									<S.TransactionCard key={transaction.id}>
										<div>
											<strong>{transaction.name}</strong>
											<span>{transaction.category}</span>
										</div>

										<S.PriceHighlight variant={transaction.type}>
											{transaction.type === 'outcome' && '- '}
											{priceFormatter.format(transaction.price)}
										</S.PriceHighlight>
									</S.TransactionCard>
								))}
							</S.TransactionsList>
						</S.DayGroup>
					))}
			</S.Content>
		</S.Container>
	)
} 