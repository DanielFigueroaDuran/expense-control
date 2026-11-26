import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
      const { state } = useBudget();
      const filteredExpenses = state.currentCategory ? state.expenses.filter(
            expense => expense.category === state.currentCategory) : state.expenses;
      const isEnty = filteredExpenses.length === 0;

      return (
            <div className="mt-10">
                  {isEnty
                        ? <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p>
                        : (
                              <>
                                    <p className="text-gray-600 text-2xl font-bold">Listado de Gasto</p>
                                    {filteredExpenses.map(expense => (
                                          <ExpenseDetail
                                                key={expense.id}
                                                expense={expense}
                                          />
                                    ))}

                              </>
                        )
                  }
            </div>
      )
}

export default ExpenseList