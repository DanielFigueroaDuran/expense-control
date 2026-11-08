import { formatCurrencyEur, formatCurrencyUsa } from "../helpers"

type AmountDisplayProps = {
      label?: string,
      amount: number,
      currency: string
}
const AmountDisplay = ({ label, currency, amount }: AmountDisplayProps) => {
      return (
            <p className=" text-2xl text-blue-600 font-bold">
                  {label && `${label}:`}
                  <span className="font-black text-black">
                        {/* {formatCurrencyEur(amount)} */}
                        {currency === "$"
                              ? formatCurrencyUsa(amount)
                              : formatCurrencyEur(amount)
                        }
                  </span>
            </p>
      )
}

export default AmountDisplay