const formatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
})

export const formatPrice = (value) => formatter.format(value ?? 0)