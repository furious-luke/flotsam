import {useState} from 'react'
import {isEmpty, handleEvent, identity} from '../utils'

/*
 * For when you need a really, really simple way to manage form
 * data.
 *
 * This simple hook uses JS proxies to prevent the need to know which
 * fields we might need ahead of time. The proxy for updating form
 * data values returns an updater function on-demand for the requested
 * property. It's prety neat.
 *
 * Usage looks something like this:
 *
 *   const initialValues = {first: 1, second: 2}
 *   const [values, update, rawUpdate] = useForm(initialValues)
 *   return (
 *     <>
 *       <input value={values.first} onChange={update.first} />
 *       <input value={values.second} onChange={update.second} />
 *       <button onClick={() => rawUpdate(initialValues)}>Reset</button>
 *     </>
 *   )
 */
export function useForm(initialValues = {}, submitMutation) {
  const [values, setValues] = useState(initialValues)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState()
  // By using a proxy I'm able to automatically convert undefined
  // values to empty strings to prevent React from complaining without
  // having to pollute the form data with empty string values when
  // they're not actually intended.
  const valuesProxy = new Proxy(values, {
    get(target, name) {
      return target[name] !== undefined ? target[name] : ''
    },
  })
  function updateValues(changedValues) {
    const newValues = { ...values, ...changedValues }
    setValues(newValues)
  }
  // Another proxy here means I don't have to predict form fields
  // ahead of time in order to return a tailored updater function.
  const updateValuesProxy = new Proxy(updateValues, {
    get(target, name) {
      return handleEvent(value => updateValues({[name]: value}))
    },
  })
  // Submit action. Submits the form using submitMutation.
  async function submit() {
    if (submitMutation) {
      setLoading(true)
      try {
        await submitMutation(values)
      }
      catch (e) {
        setErrors(e.errors || e)
        throw e
      }
      finally {
        setLoading(false)
      }
    }
  }
  // Return the raw "updateValues" function so we are able to submit
  // multiple changes at once, if needed.
  return [valuesProxy, updateValuesProxy, submit, {loading, errors}]
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
