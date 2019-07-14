import React from 'react'
import {useMutation as useMutationBase} from 'graphql-hooks'
import {STATUS} from 'tidbits/utils/status'

export function useMutation(query, options = {}) {
  if (!query) {
    throw new Error('Must supply a query to useMutation')
  }
  const {
    variable,
    onChange,
    meta = {},
    ...baseOptions
  } = options
  const [mutateBase, metaBase] = useMutationBase(query, baseOptions)

  async function mutate(value, ...mutateArgs) {
    if (onChange) {
      onChange(makeChangeValue(variable, value, meta))
    }
    const response = await mutateBase(makeMutateValue(variable, value))
    try {
      checkForResponseError(response)
    } catch (e) {
      if (onChange) {
        onChange({meta: {...meta, status: STATUS.failure}})
      }
      throw e
    }
    if (onChange) {
      onChange({meta: {...meta, status: STATUS.success}})
    }
    return response
  }

  return [mutate, makeMeta(meta, metaBase)]
}

function makeChangeValue(variable, value, meta) {
  return {value, meta: {...meta, status: STATUS.loading}}
}

function makeMutateValue(variable, value) {
  return variable ? {[variable]: value} : value
}

function checkForResponseError(response) {
  if (response.error) {
    throw makeAPIError(response)
  }
}

function makeAPIError(response) {
  const error = new APIError(response.httpError.body)
  error.data = JSON.parse(response.httpError.body)
  error.response = response
  return error
}

class APIError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, APIError)
  }
}

function makeMeta(currentMeta, mutateMeta) {
  return {
    ...currentMeta,
    status: makeStatus(mutateMeta),
    errors: mutateMeta.error ? makeAPIError(mutateMeta).data.errors : null
  }
}

function makeStatus(mutateMeta) {
  if (mutateMeta.error) {
    return STATUS.failure
  }
  if (mutateMeta.loading) {
    return STATUS.loading
  }
  if (mutateMeta.error === false) {
    return STATUS.success
  }
  return null
}
