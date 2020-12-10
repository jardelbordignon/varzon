// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const formatDate = (date, dateTextFormat = false, language = 'pt-BR') => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString(language, dateTextFormat && options)
}

export default formatDate
