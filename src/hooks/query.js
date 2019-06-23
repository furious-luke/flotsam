import {useMutation as useMutationBase} from 'graphql-hooks'

class APIError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, APIError)
  }
}

function makeAPIError(response) {
  const error = new APIError(response.httpError.body)
  error.response = response
  return error
}

export function useMutation(query, ...args) {
  if (query) {
    const [mutateBase, ...rest] = useMutationBase(query, ...args)
    async function mutate(...mutateArgs) {
      const response = await mutateBase(...mutateArgs)
      if (response.error) {
	throw makeAPIError(response)
      }
      return response
    }
    return [mutate, ...rest]
  } else {
    return []
  }
}
