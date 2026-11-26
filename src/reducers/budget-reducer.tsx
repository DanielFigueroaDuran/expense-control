import { v4 as uuidv4 } from "uuid";
import type { Category, DraftExpense, Expense } from "../types";
//import { Category } from '../types/index';

export type Currency = "$" | "€" | "";

export type BudgetData = {
      budget: number,
      currency: Currency
};

export type BudgetActions =
      { type: 'add-budget', payload: BudgetData } |
      { type: 'show-modal' } |
      { type: 'close-modal' } |
      { type: 'add-expense', payload: { expense: DraftExpense } } |
      { type: 'remove-expense', payload: { id: Expense['id'] } } |
      { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
      { type: 'update-expense', payload: { expense: Expense } } |
      { type: 'reset-app' } |
      { type: 'add-filter-category', payload: { id: Category['id'] } }

const initialBudget = (): BudgetData => {
      const localStorageBudget = localStorage.getItem('budget');
      return localStorageBudget
            ? JSON.parse(localStorageBudget)
            : {
                  budget: 0,
                  currency: ''
            };
};

const localStorageExpenses = (): Expense[] => {
      const localStorageExpenses = localStorage.getItem('expenses');
      return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export type BudgetState = {
      budget: BudgetData,
      modal: boolean,
      expenses: Expense[],
      editingId: Expense['id'],
      currentCategory: Category['id']
};

export const initialState: BudgetState = {
      budget: initialBudget(),
      modal: false,
      expenses: localStorageExpenses(),
      editingId: '',
      currentCategory: ''
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
                  localStorage.setItem('budget', JSON.stringify(action.payload));

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
                        ...state, modal: false,
                        editingId: ''
                  };
            case 'add-expense':
                  const expense = createExpense(action.payload.expense);
                  return {
                        ...state,
                        expenses: [...state.expenses, expense],
                        modal: false
                  };
            case 'remove-expense':
                  return {
                        ...state,
                        expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
                  };
            case 'get-expense-by-id':
                  return {
                        ...state,
                        editingId: action.payload.id,
                        modal: true
                  };
            case 'update-expense':
                  return {
                        ...state,
                        expenses: state.expenses.map(expense => expense.id === action.payload.expense.id
                              ? action.payload.expense
                              : expense
                        ),
                        modal: false,
                        editingId: ''
                  };
            case 'reset-app':
                  return {
                        ...state,
                        budget: {
                              budget: 0,
                              currency: ''
                        },
                        modal: false,
                        expenses: [],
                        editingId: ''

                  };
            case 'add-filter-category':
                  return {
                        ...state,
                        currentCategory: action.payload.id
                  };

            default:
                  return state;
      };
};

