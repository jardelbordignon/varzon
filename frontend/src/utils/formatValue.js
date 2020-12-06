// formatValue('15.30', 'DB') => 1530
// formatValue('15.30') => R$ 15,30
const formatValue = (value, currency = 'BRL') => {
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

export default formatValue