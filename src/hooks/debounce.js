import {useState} from 'react'

export function useDebounce(timeoutMs=300) {
  const [timeoutHandle, setTimeoutHandle] = useState()
  function debounce(callback) {
    return (...args) => {
      clearTimeout(timeoutHandle)
      setTimeoutHandle(
        setTimeout(
          () => callback(...args),
          timeoutMs
        )
      )
    }
  }
  return debounce
}
