import { v4 as uuidv4 } from "uuid";
import type { DraftExpense, Expense } from "../types";

export type Currency = "$" | "€" | "";

export type BudgetData = {
      budget: number,
      currency: Currency
};

export type BudgetActions =
      { type: 'add-budget', payload: BudgetData } |
      { type: 'show-modal' } |
      { type: 'close-modal' } |
      { type: 'add-expense', payload: { expense: DraftExpense } }

export type BudgetState = {
      budget: BudgetData,
      modal: boolean,
      expenses: Expense[]
};

export const initialState: BudgetState = {
      budget: {
            budget: 0,
            currency: ""
      },
      modal: false,
      expenses: []
};

const createExpense = (draftExpense: DraftExpense): Expense => {
      return {
            ...draftExpense,
            id: uuidv4()
      }
};

export const budgetReducer = (
      state: BudgetState = initialState,
      action: BudgetActions
): BudgetState => {
      switch (action.type) {
            case 'add-budget':
                  return {
                        ...state,
                        budget: action.payload
                  };
            case 'show-modal':
                  return {
                        ...state, modal: true
                  };
            case 'close-modal':
                  return {
                        ...state, modal: false
                  };
            case 'add-expense':
                  const expense = createExpense(action.payload.expense);
                  return {
                        ...state,
                        expenses: [...state.expenses, expense]
                  };
            default:
                  return state;
      };
};

