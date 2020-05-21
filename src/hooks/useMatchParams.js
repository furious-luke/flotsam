import {useMatch} from '@reach/router'

export function useMatchParams(path) {
  const match = useMatch(path) || {}
  return match || {}
}
