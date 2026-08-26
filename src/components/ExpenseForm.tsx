import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { categories } from "../data/categories"
import { useState } from 'react';
import type { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';


const ExpenseForm = () => {
      const [expense, setExpense] = useState<DraftExpense>({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
      });
      const [error, setError] = useState('');
      const { dispatch } = useBudget();

      const handleChange = (
            event:
                  React.ChangeEvent<HTMLInputElement> |
                  React.ChangeEvent<HTMLSelectElement>) => {
            const { name, value } = event.target
            const isAmountField = ['amount'].includes(name);
            //console.log(isAmountField);
            setExpense({
                  ...expense,
                  [name]: isAmountField ? +value : value
            });

      };

      const handleChangeDate = (value: Value) => {
            // console.log(value);
            setExpense({
                  ...expense,
                  date: value
            })
      }

      const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
            event.preventDefault();
            //Validar 
            if (Object.values(expense).includes('')) {
                  setError('Todos Los Campos Son Obligatorios');
                  return;
            };

            // add a new expense
            dispatch({ type: 'add-expense', payload: { expense } });
      };

      return (
            <form className="space-y-5" onSubmit={handleSubmit}>
                  <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                        Nuevo Gasto
                  </legend>

                  {error && <ErrorMessage>{error}</ErrorMessage>}

                  <div className="flex flex-col gap-2">
                        <label
                              htmlFor="expenseName"
                              className="text-xl"
                        >
                              Nombre Gasto:

                        </label>
                        <input
                              type="text"
                              id="expenseName"
                              placeholder="Añade el Nombre del Gasto"
                              className="bg-slate-100 p-2"
                              name="expenseName"
                              onChange={handleChange}
                        />
                  </div>
                  <div className="flex flex-col gap-2">
                        <label
                              htmlFor="amount"
                              className="text-xl"
                        >
                              Cantidad:

                        </label>
                        <input
                              type="number"
                              id="amount"
                              placeholder="Añade la Cantidad del Gasto"
                              className="bg-slate-100 p-2"
                              name="amount"
                              onChange={handleChange}
                        />
                  </div>
                  <div className="flex flex-col gap-2">
                        <label
                              htmlFor="category"
                              className="text-xl"
                        >
                              Categorias:

                        </label>
                        <select
                              id="category"
                              className="bg-slate-100 p-2"
                              name="category"
                              onChange={handleChange}
                        >
                              <option value="">-- Seleccione --</option>
                              {categories.map(category => (
                                    <option
                                          key={category.id}
                                          value={category.id}
                                    >
                                          {category.name}
                                    </option>
                              ))}
                        </select>
                  </div>
                  <div className="flex flex-col gap-2">
                        <label
                              htmlFor="date"
                              className="text-xl"
                        >
                              Fecha Gasto

                        </label>

                        <DatePicker
                              className="bg-slate-100 p-2 border-0"
                              value={expense.date}
                              onChange={handleChangeDate}
                        />
                  </div>

                  <input
                        type="submit"
                        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                        value={'Registrar Gasto'}
                  />
            </form>
      )
}

export default ExpenseForm