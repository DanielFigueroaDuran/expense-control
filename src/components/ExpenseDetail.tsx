import { categories } from "../data/categories";
import { formatDate } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import type { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { SwipeableItem } from "./SwipeableItem";

type ExpenseDetailProps = {
      expense: Expense;
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
      const { state, dispatch } = useBudget();

      const categoryInfo = categories.find(cat => cat.id === expense.category);

      const handleDelete = () => {
            dispatch({ type: 'remove-expense', payload: { id: expense.id } });
      };

      const handleEdit = () => {
            dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })
      };

      return (
            <SwipeableItem onDelete={handleDelete} onEdit={handleEdit}>
                  <div className="bg-white p-6 w-full flex items-center gap-5">
                        <div className="">
                              <img
                                    src={`/icono_${categoryInfo?.icon || 'default'}.svg`}
                                    alt={categoryInfo?.name || 'Categoría'}
                                    className="w-20"
                              />
                        </div>
                        <div className="flex-1 space-y-2">
                              <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name}</p>
                              <p>{expense.expenseName}</p>
                              <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                        </div>
                        <AmountDisplay
                              amount={expense.amount}
                              currency={state.budget.currency}
                        />
                  </div>
            </SwipeableItem>
      );
};

export default ExpenseDetail;