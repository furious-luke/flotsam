import {maybe} from './functional'

export function preventDefault(func) {
  return (event, ...args) => {
    event.preventDefault()
    return maybe(func)(event, ...args)
  }
}

export function stopPropagation(func) {
  return (event, ...args) => {
    event.stopPropagation()
    return maybe(func)(event, ...args)
  }
}

export function eventValue(func) {
  return event => maybe(func)(event.target.value)
}
