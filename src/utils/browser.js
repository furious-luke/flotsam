import {parse, stringify} from 'flatted/esm'

import {isNullish} from './primitives'

export function fromLocalStorage(key, defaultValue) {
  const value = localStorage.getItem(key)
  if (isNullish(value)) {
    return defaultValue
  }
  return parse(value)
}

export function toLocalStorage(key, value) {
  localStorage.setItem(key, stringify(value))
}
