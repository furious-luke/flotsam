export function identity() {
}

export function maybe(func, ...args) {
  if (func) {
    return (...subArgs) => func(...args, ...subArgs)
  }
  return identity
}
