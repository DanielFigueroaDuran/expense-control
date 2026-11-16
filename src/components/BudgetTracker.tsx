import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"

const BudgetTracker = () => {
      const { state } = useBudget();
      const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0);
      const remainingBudget = state.budget.budget - totalExpenses;

      return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex justify-center">
                        <img src="/grafico.jpg" alt="spending chart" />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-8">
                        <button
                              type="button"
                              className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                        >
                              Resetear App
                        </button>

                        <AmountDisplay
                              label="Presupuesto"
                              currency={state.budget.currency}
                              amount={state.budget.budget}
                        />

                        <AmountDisplay
                              label="Dispoible"
                              amount={remainingBudget}
                        />

                        <AmountDisplay
                              label="Gastado"
                              amount={totalExpenses}
                        />
                  </div>
            </div>
      )
}

export default BudgetTracker