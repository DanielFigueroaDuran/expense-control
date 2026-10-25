import { useState } from "react";
import { useBudget } from "../hooks/useBudget";
import type { Currency } from "../reducers/budget-reducer";

const BudgetForm = () => {
      const [budget, setBudget] = useState(0);
      const [currency, setCurrency] = useState<Currency>('');
      const { dispatch } = useBudget();

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.valueAsNumber;
            // If the user deleted the entire number, we force a 0 in the state.
            setBudget(isNaN(value) ? 0 : value);

      };

      const isInvalidBudget = budget <= 0 || currency === '';

      const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
            event.preventDefault();
            dispatch({ type: 'add-budget', payload: { budget, currency } })
      };

      return (
            <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-5">
                        <label htmlFor="budget" className="text-blue-600 font-bold text-center">
                              Definir Presupuesto
                        </label>
                        <div className="flex bg slate-100 border border-gray-200  rounded-sm">
                              <select
                                    name="currency"
                                    id="currency"
                                    value={currency}
                                    className=" p-2 border-r border-gray-200"
                                    onChange={(event) => {
                                          const value = event.target.value
                                          if (value === "$" || value === "€" || value === "") {
                                                setCurrency(value);
                                          }
                                    }}
                              >
                                    <option value="">--</option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                              </select>
                              <input
                                    id="budget"
                                    type="number"
                                    className="w-full bg-white  p-2"
                                    placeholder="Define tu Presupuesto"
                                    name="budget"
                                    value={budget === 0 ? '' : budget}
                                    onChange={handleChange}
                              />
                        </div>
                  </div>

                  <input
                        type="submit"
                        value='Definir Presupuesto'
                        className={`w-full p-3 font-bold text-white rounded transition-colors duration-200 
                              ${isInvalidBudget
                                    ? "bg-slate-700 text-slate-400 cursor-not-allowed opacity-40"
                                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                              }`}
                        disabled={isInvalidBudget}
                  />
            </form>
      )
}

export default BudgetForm