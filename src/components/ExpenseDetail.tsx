import { categories } from "../data/categories";
import { formatDate } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import type { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProps = {
      expense: Expense,
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
      const { state } = useBudget();
      const categoryInfo = categories.filter(cat => cat.id === expense.category)[0];

      return (
            <div
                  key={expense.id}
                  className=" bg-white shadow-lg p-10 w-full border-b border-grar-200 flex items-center gap-5"
            >
                  <div className="">
                        <img
                              src={`/icono_${categoryInfo.icon}.svg`}
                              alt={categoryInfo.name}
                              className="w-20"
                        />
                  </div>
                  <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                  </div>
                  <AmountDisplay
                        amount={expense.amount}
                        currency={state.budget.currency}
                  />

            </div>
      )
}

export default ExpenseDetail