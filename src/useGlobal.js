import * as React from 'reactn'

export function useGlobal(key) {
  const [state] = React.useGlobal(key)
  const dispatch = React.useDispatch(reducer, key)
  return [state, dispatch]
}

export function reducer(state = {}, payload) {
  const newState = {
    ...state,
    ...payload
  }
  return newState
}
