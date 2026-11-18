import { useReducer, createContext, type ReactNode } from "react";
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer";

type BudgetContextProps = {
      state: BudgetState,
      dispatch: React.ActionDispatch<[action: BudgetActions]>,
      auth: boolean,
      totalExpenses: number,
      remainingBudget: number
}
type BudgetProviderProps = {
      children: ReactNode
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
      const [state, dispatch] = useReducer(budgetReducer, initialState);
      const auth = true;
      const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0);
      const remainingBudget = state.budget.budget - totalExpenses;

      return (
            <BudgetContext.Provider
                  value={
                        {
                              state,
                              dispatch,
                              auth,
                              totalExpenses,
                              remainingBudget
                        }
                  }>
                  {children}
            </BudgetContext.Provider>
      )

};