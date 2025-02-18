import { Header } from "../../components/Header"
import { Summary } from "../../components/Summary"
import { SectionTransactions } from "../../sections/SectionTransactions"

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <SectionTransactions />
    </div>
  )
}