// formatPrice('15.30', 'DB') => 1530
// formatPrice('15.30') => R$ 15,30
export const formatPrice = (value, currency = 'BRL') => {
  switch (currency) {
    case 'toI':
      return Number(value.toFixed(2).replace('.', ''))
    case 'toF':
      return Number(value.toFixed(2))
    default:
      return Intl.NumberFormat('pt-br', { style: 'currency', currency })
        .format(value) // .replace(/^(\D+)/, '$1 ') // add space
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export const formatDate = (date, dateTextFormat = false, language = 'pt-BR') => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString(language, dateTextFormat && options)
}

