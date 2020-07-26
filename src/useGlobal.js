import * as React from 'reactn'

export function useGlobal(key) {
  const [state] = React.useGlobal(key)
  const dispatch = React.useDispatch(reducer(key), key)
  return [state, dispatch]
}

export function reducer(key) {
  return (state = {}, payload) => {
    const newState = {
      ...state,
      ...payload
    }
    console.debug('Global state: ', key, newState)
    return newState
  }
}
