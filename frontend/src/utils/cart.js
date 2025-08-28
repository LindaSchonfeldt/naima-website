export const getItemQuantity = (it) => it?.quantity ?? it?.qty ?? 1

export const getItemPrice = (it) =>
  Number(it?.selectedSize?.price ?? it?.price ?? 0) || 0

export const calcCartTotal = (items = []) =>
  Array.isArray(items)
    ? items.reduce((sum, it) => sum + getItemPrice(it) * getItemQuantity(it), 0)
    : 0

export const formatCurrency = (
  value,
  { locale = undefined, currency = 'USD' } = {}
) => {
  const v = Number(value || 0)
  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(v)
  }
  return `${currency} ${v.toFixed(2)}`
}
