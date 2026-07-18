import { useReducer, createContext, type ReactNode } from "react";
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer";

type BudgetContextProps = {
      state: BudgetState,
      dispatch: React.ActionDispatch<[action: BudgetActions]>,
      auth: boolean
}
type BudgetProviderProps = {
      children: ReactNode
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
      const [state, dispatch] = useReducer(budgetReducer, initialState);
      const auth = true;
      return (
            <BudgetContext.Provider
                  value={
                        {
                              state,
                              dispatch,
                              auth
                        }
                  }>
                  {children}
            </BudgetContext.Provider>
      )

};