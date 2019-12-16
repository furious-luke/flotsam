import {maybe} from './functional'

export function preventDefault(func) {
  return (event, ...args) => {
    event.preventDefault()
    return maybe(func)(event, ...args)
  }
}
