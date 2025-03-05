export interface TransactionFormInputs {
	name: string
	price: number
	category: string
	type: 'income' | 'outcome'
	isRecurrent: boolean
	recurrentMonths: number
}

export interface EditTransactionFormInputs {
	name?: string
	price?: number
	category?: string
	type?: 'income' | 'outcome'
	createdAt?: string
	isRecurrent?: boolean
	recurrentMonths?: number
}

export interface Transaction {
	id: string
	userId: string
	createdAt: string
	name: string
	price: number
	category: string
	type: 'income' | 'outcome'
	isRecurrent: boolean
	recurrentMonths: number
}
