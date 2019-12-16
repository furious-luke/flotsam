import {useState, useEffect} from 'react'
// import {useContextState} from 'constate'
import {parse, stringify} from 'flatted/esm'

export function useLocalStorage(key, initialValue, options = {}) {
  // const useFunc = options.context ? useContextState : (k, v) => useState(v)
  const useFunc = (k, v) => useState(v)
  function getStoredValue() {
    const storedValue = !options.disabled ? localStorage.getItem(key) : null
    if (storedValue === null) {
      return initialValue
    } else {
      try {
        return parse(storedValue)
      } catch (e) {
        console.error(e)
        localStorage.removeItem(key)
        return initialValue
      }
    }
  }
  // TODO: I'd rather not have to use extra state here, but figuring
  // out if this is the first render is balls.
  const [localValue, _setLocalValue] = useFunc(key, getStoredValue())
  function setLocalValue(newLocalValue) {
    if (!options.disabled) {
      localStorage.setItem(key, stringify(newLocalValue))
    }
    _setLocalValue(newLocalValue)
  }
  function clearLocalValue() {
    localStorage.removeItem(key)
  }
  return [localValue, setLocalValue, clearLocalValue]
}
