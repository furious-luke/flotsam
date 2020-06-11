import {toArray, isEmpty} from '../utils/primitives'
import {maybe} from '../utils/functional'

type UseSelect = {
  value?: any,
  multi?: boolean,
  full?: boolean,
  valueKey: string,
  onChange?: Function
}

export function useSelect({value, multi, full, valueKey, onChange}: UseSelect = {}) {
  function handleChange({value}) {
    let mapped = full ? value : value.map(v => v[valueKey])
    if (!multi) {
      mapped = mapped[0]
    }
    return maybe(onChange)(mapped)
  }
  function toValue(value) {
    if (isEmpty(value)) {
      return value
    }
    value = toArray(value)
    return full ? value : value.map(v => ({[valueKey]: v}))
  }
  return [toValue(value), handleChange]
}
