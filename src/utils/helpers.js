import { colours } from './constants'
export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}

export const colourNameToHex = (colour) => {
  if (typeof colours[colour.toLowerCase()] != 'undefined')
    return colours[colour.toLowerCase()]

  return false
}
