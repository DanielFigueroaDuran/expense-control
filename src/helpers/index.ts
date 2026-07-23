export const formatCurrencyUsa = (amount: number) => {
      return new Intl.NumberFormat('en-Us', { style: 'currency', currency: 'USD' }).format(amount);
};

export const formatCurrencyEur = (amount: number) => {
      return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
      }).format(amount);
};