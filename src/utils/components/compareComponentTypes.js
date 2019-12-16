export function compareComponentTypes(a, b) {
  // TODO: Using `displayName` here is a result of a bug in HMR:
  // https://github.com/gaearon/react-hot-loader/issues/304
  if (!a || !b) {
    return false
  }
  const aName = unnestHmrType(a)
  const bName = unnestHmrType(b)
  return aName === bName
}

function unnestHmrType(type) {
  return type.name === 'ProxyFacade' ? type.displayName : type.name
}
