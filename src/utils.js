import {parse, stringify} from 'flatted/esm'

export function identity(value) {
  return value
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isFunc(value) {
  return value && {}.toString.call(value) === '[object Function]'
}

export function isArray(value) {
  return Array.isArray(value)
}

export function callIfFunc(value) {
  if (isFunc(value)) {
    return value()
  } else {
    return value
  }
}

export function deref(object, path, defaultValue) {
  let value = object
  path
    .split('.')
    .forEach(p => value = value ? value[p] : value)
  return (value !== undefined) ? value : defaultValue
}

export function lowerCase(value) {
  if (value === null || value === undefined) {
    return value
  } else {
    return value.toLowerCase()
  }
}

export function initialize(value) {
  if (isNil(value)) {
    return ''
  } else {
    return value
      .replace(/['",-.]/, '')
      .split(/[\W_]+/)
      .map(w => w.charAt(0).toUpperCase())
      .join('')
  }
}

export function findKey(object, key) {
  const curKeys = Object.keys(object)
  if (curKeys.includes(key)) {
    return object[key]
  } else {
    for (const value of Object.values(object)) {
      const result = findKey(value, key)
      if (result !== undefined) {
        return result
      }
    }
  }
  return undefined
}

export function arrayPush(array, value) {
  return [...(array || []), value]
}

export function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function toObject(array, lookup) {
  const result = {}
  array.forEach(value => {
    const entry = lookup(value)
    console.assert(entry[0] !== undefined, 'undefined key is invalid')
    result[entry[0]] = entry[1]
  })
  return result
}

export function callIf(func, ...rest) {
  if (func) {
    return func(...rest)
  }
}

export function callHandler(func) {
  return (...args) => () => (func || (() => undefined))(...args)
}

export function isNil(value) {
  return value === undefined || value === null
}

export function isEmpty(value) {
  return value === '' || isNil(value)
}

export function fromLocalStorage(key, defaultValue) {
  const value = localStorage.getItem(key)
  if (isNil(value)) {
    return defaultValue
  }
  return parse(value)
}

export function clipText(text, options = {}) {
  if (!text) {
    return text
  }
  const {maxLength = 200, ellipsis = ' ...'} = options
  if (text.length > maxLength) {
    text = text.slice(0, maxLength - ellipsis.length) + ellipsis
  }
  return text
}

export function handleEvent(onChange, ...args) {
  return event => onChange(event.target.value, ...args)
}

export function arrayMutate(items, value, index) {
  return [
    ...items.slice(0, index),
    value,
    ...items.slice(index + 1)
  ]
}

export function arrayExtend(items, optionalItem) {
  return [
    ...items,
    ...(optionalItem ? [optionalItem] : [])
  ]
}
