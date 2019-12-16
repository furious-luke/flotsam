export function isObject(value) {
  return typeof value === 'object' && value !== null
}

export function isNullish(value) {
  return value === undefined || value === null
}

export function isNil(value) {
  return value === undefined || value === null
}

export function isEmpty(value) {
  if (isObject(value)) {
    return Object.keys(value).length === 0
  }
  return isNullish(value)
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isNumber(value) {
  return !isNaN(value)
}

export function toString(value) {
  if (!isNullish(value)) {
    return `${value}`
  } else {
    return value
  }
}

export function toggleKey(object, key) {
  return ({
    ...object,
    [key]: !object[key]
  })
}

export function deref(object, path, defaultValue) {
  let value = object
  path
    .split('.')
    .forEach(p => value = value ? value[p] : value)
  return (value !== undefined) ? value : defaultValue
}
