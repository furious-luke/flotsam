import React, {useState} from 'react'
import {useMutation as useMutationBase} from 'graphql-hooks'
import {STATUS} from 'tidbits/utils/status'

export function useMutation(query, options = {}) {
  if (!query) {
    throw new Error('Must supply a query to useMutation')
  }
  const {
    variables = {},
    onMeta,
    ...baseOptions
  } = options

  const [mutateBase, mutateMeta] = useMutationBase(query, baseOptions)
  const [lastSuccess, setLastSuccess] = useState()

  async function mutate(mutateVariables) {
    const finalVariables = removeUndefined({
      ...variables,
      ...mutateVariables
    })
    console.debug(`Executing query: ${query}`)
    console.debug('Variables: ', finalVariables)
    if (onMeta) {
      onMeta({
        ...makeMeta(mutateMeta, lastSuccess),
        status: STATUS.loading
      })
    }
    const response = await mutateBase({variables: finalVariables})
    try {
      checkForResponseError(response)
    }
    catch (e) {
      if (onMeta) {
        onMeta(makeMeta(mutateMeta, lastSuccess))
      }
      throw e
    }
    const newLastSuccess = new Date()
    setLastSuccess(newLastSuccess)
    if (onMeta) {
      onMeta(makeMeta(response, newLastSuccess))
    }
    return response
  }

  return [mutate, makeMeta(mutateMeta, lastSuccess)]
}

function makeMeta(mutateMeta, lastSuccess) {
  return {
    status: makeStatus(mutateMeta),
    errors: mutateMeta.error ? makeAPIError(mutateMeta).data.errors : null,
    lastSuccess
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

function removeUndefined(object) {
  const newObject = {}
  for (const key of Object.keys(object)) {
    if (object[key] !== undefined) {
      newObject[key] = object[key]
    }
  }
  return newObject
}
