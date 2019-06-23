import {useState} from 'react'

export function useToggle(initial) {
  const [value, setValue] = useState(initial)
  function toggleValue() {
    setValue(!value)
  }
  return [value, toggleValue]
}
