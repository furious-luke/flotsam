export function countLabel(count, label, plural) {
  if (count === 1) {
    return `1 ${label}`
  }
  return `${count} ${plural || (label + 's')}`
}

/**
 * Convert a snake-case string to camel-case.
 */
export function toCamelCase(string: string): string {
  if (!string) {
    return string
  }
  return string.replace(/(\_\w)/g, m => m[1].toUpperCase())
}
