export function countLabel(count, label, plural) {
  if (count === 1) {
    return `1 ${label}`
  }
  return `${count} ${plural || (label + 's')}`
}

export function toCamelCase(string) {
  return string.replace(/(\_\w)/g, m => m[1].toUpperCase())
}
