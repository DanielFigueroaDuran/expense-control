import { useState } from "react";

const BudgetForm = () => {
      const [budget, setBudget] = useState(0);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber;
            // If the user deleted the entire number, we force a 0 in the state.
            setBudget(isNaN(value) ? 0 : value);

      };

      const isInvalidBudget = budget <= 0;

      return (
            <form className="space-y-5">
                  <div className="flex flex-col space-y-5">
                        <label htmlFor="budget" className="text-blue-600 font-bold text-center">
                              Definir Presupuesto
                        </label>
                        <input
                              id="budget"
                              type="number"
                              className="w-full bg-white border border-gray-200 p-2"
                              placeholder="Define tu Presupuesto"
                              name="budget"
                              value={budget === 0 ? '' : budget}
                              onChange={handleChange}
                        />
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