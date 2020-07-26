/**
 * Test if a variable is a function.
 */
export function isFunction(value: any): boolean {
  return value && {}.toString.call(value) === '[object Function]'
}

/**
 * Test if a variable is a primitive object.
 */
export function isObject(value: any): boolean {
  return !isArray(value) && typeof value === 'object' && value !== null
}

/**
 * Test if a variable is undefined or null (nullish).
 */
export function isNullish(value: any): boolean {
  return value === undefined || value === null
}

/**
 * Deprecated.
 */
export function isNil(value: any): boolean {
  return isNullish(value)
}

export function isEmpty(value) {
  if (isObject(value)) {
    return Object.keys(value).length === 0
  }
  return isNullish(value) || value === ''
}

/**
 * Test if variable is an array.
 */
export function isArray(value: any): value is any[] {
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

/**
 * Dereference an object type using a period separated path. This is
 * the same as the null-propagation operator.
 *
 * @param object - The object to propagate into
 * @param path - The properties to sequentially dereference
 * @param defaultValue - A default value to return when a property does not exist
 * @returns The dereferenced value or the default value
 */
export function deref(
  object: object,
  path: string | string[],
  defaultValue?: any
): any {
  if (!path) {
    return defaultValue
  }
  let value = object
  if (!isArray(path)) {
    path = path
      .split('.')
  }
  path.forEach(p => value = value ? value[p] : value)
  return (value !== undefined) ? value : defaultValue
}

export function mergeObjects(a, b) {
  let target = {...a}
  Object.keys(b).forEach(k => {
    const av = a[k]
    const bv = b[k]
    if (isObject(av) && isObject(bv)) {
      target[k] = mergeObjects(av, bv)
    } else if (bv === undefined) {
      target[k] = av
    } else {
      target[k] = bv
    }
  })
  return target
}

export function flattenObject(obj, prefix = '') {
  let target = {}
  Object.keys(obj).forEach(k => {
    const path = `${prefix}${k}`
    const value = obj[k]
    if (isObject(value)) {
      target = {
        ...target,
        ...flattenObject(value, path + '.')
      }
    } else {
      target[path] = value
    }
  })
  return target
}

export function stripUndefined(obj) {
  const result = {}
  for (const key of Object.keys(obj)) {
    const value = obj[key]
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result
}

export function removeFromArrayById(array, value, key) {
  const index = (array || []).findIndex(item => deref(item, key) == value)
  if (index > -1) {
    array = [
      ...array.slice(0, index),
      ...array.slice(index + 1)
    ]
  }
  return array
}
