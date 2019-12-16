export function countLabel(count, label, plural) {
  if (count === 1) {
    return `1 ${label}`
  }
  return `${count} ${plural || (label + 's')}`
}
