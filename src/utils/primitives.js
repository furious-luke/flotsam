export function isFunction(value) {
  return value && {}.toString.call(value) === '[object Function]'
}

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
  return isNullish(value) || value === ''
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isNumber(value) {
  return !isNaN(value)
}

export function toArray(value) {
  if (isEmpty(value)) {
    return value
  }
  if (!isArray(value)) {
    return [value]
  }
  return value
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
  if (!isArray(path)) {
    path = path
      .split('.')
  }
  path.forEach(p => value = value ? value[p] : value)
  return (value !== undefined) ? value : defaultValue
}
