import {useState} from 'react'
import {isEmpty, handleEvent, identity} from 'tidbits/utils'

export function useForm(initialValues = {}, factory = identity) {
  const [values, setValues] = useState(factory(initialValues))

  const valuesProxy = new Proxy(values, {get(target, name) {
    return (target[name] !== undefined) ? target[name] : ''
  }})

  function updateValues(changedValues) {
    const newValues = {...values, ...changedValues}
    setValues(newValues)
  }

  const updateValuesProxy = new Proxy(updateValues, {get(target, name) {
    return handleEvent(value => updateValues({[name]: value}))
  }})

  return [
    valuesProxy,
    updateValuesProxy
  ]
}

function updateTouched(state, initial, changed) {
  const touched = {...state.touched}
  for (const key of changed) {
    const cur = state.values[key]
    const old = initial.values[key]
    if (isEmpty(cur) && isEmpty(old)) {
      touched[key] = false
    } else {
      touched[key] = cur !== old
    }
  }
  return {
    ...state,
    touched
  }
}

function defaultErrorHandler(state, error) {
  return {
    ...state,
    errors: {
      ...state.errors,
      __all__: error.message
    }
  }
}
