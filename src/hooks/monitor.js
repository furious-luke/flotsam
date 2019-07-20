import React, {useState} from 'react'

export function useMonitor(value) {
  const [initialValue, setInitialValue] = useState(value)
  return [value != initialValue, setInitialValue]
}
