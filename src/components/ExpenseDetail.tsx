import { formatDate } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import type { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProps = {
      expense: Expense,

};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
      const { state } = useBudget();

      return (
            <div
                  key={expense.id}
                  className=" bg-white shadow-lg p-10 w-full border-b border-grar-200 flex items-center gap-5"
            >
                  <div className="">

                  </div>
                  <div className="">
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