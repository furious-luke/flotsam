import {useState} from 'react'
import {isFunc, isEmpty, isString} from 'tidbits/utils'
import {useLocalStorage} from './local-storage'

function validateForm(formDefinition, state, newValues) {
  return {
    ...state,
    values: newValues
  }
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

export function useForm({
  formKey,
  formDefinition = {},
  initialValues = {},
  editing = true,
  disableLocalStorage = true
} = {}) {
  // TODO: Mild inneficiency. Conversion to form values may cost something.
  const initialState = {values: initialValues, errors: {}, touched: {}}
  if (formDefinition.toForm) {
    initialState.values = formDefinition.toForm(initialState.values)
  }
  const [originalState, setOriginalState] = useState(initialState)
  const [localValue, setLocalValue, clearLocalValue] = useLocalStorage(
    `forms.${formKey}`,
    initialState,
    {disable: disableLocalStorage}
  )
  const [state, setState] = useState(localValue)
  const [saving, setSaving] = useState(false)

  function updateValues(changedValues) {
    if (isString(changedValues)) {
      return event => updateValues({
        [changedValues]: event.target.value
      })
    }
    const newValues = {...state.values, ...changedValues}
    const newState = updateTouched(
      validateForm(formDefinition, state, newValues),
      initialState,
      Object.keys(changedValues)
    )
    setLocalValue(newState)
    setState(newState)
  }

  function resetForm() {
    setState(originalState)
    clearLocalValue()
  }

  async function saveForm(handler) {
    console.debug('Saving form')
    setSaving(true)
    const outgoing = state
    if (formDefinition.fromForm) {
      outgoing.values = formDefinition.fromForm(state.values)
    }
    let postAction
    try {
      let result = await handler(outgoing, originalState)
      let newState = state
      if (isFunc(result)) {
        postAction = result
      } else if (result) {
        if (formDefinition.toForm) {
          newState = {
            ...newState,
            values: formDefinition.toForm(newState.values)
          }
        }
      }
      console.debug('Updating form state: ', newState)
      setState(newState)
      setOriginalState(newState)
      return true
    } catch (e) {
      console.debug('Error in form submission: ', e)
      const errorHandler = formDefinition.errorHandler || defaultErrorHandler
      const newState = errorHandler(state, e)
      setState(newState)
      return false
    } finally {
      setSaving(false)
      if (postAction) {
        postAction()
      }
    }
  }

  return {
    state: editing ? state : originalState,
    update: updateValues,
    save: handler => event => {
      event.preventDefault()
      return saveForm(handler)
    },
    reset: resetForm,
    saving
  }
}
