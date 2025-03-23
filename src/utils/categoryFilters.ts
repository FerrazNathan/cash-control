import { Transaction } from "../@types/transactionForm";

export const investmentCategories = ['Investimentos', 'investimentos', 'Investments', 'INVESTIMENTOS', 'Investing'];

export function calculateInvestments(transactions: Transaction[]) {
  return transactions
    .filter(transaction => investmentCategories.includes(transaction.category))
    .reduce((total, transaction) => total + transaction.price, 0)
} 