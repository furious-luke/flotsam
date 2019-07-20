import React from 'react'
import {useMonitor} from './monitor'
import {useMutation} from './query'

export function useTidbit(value, query, options) {
  const [hasChanged, updateMonitor] = useMonitor(value)
  const [mutate, meta] = useMutation(query, options)
  async function updateField(...args) {
    let response
    if (hasChanged) {
      response = await mutate(...args)
      updateMonitor(value)
    }
    return response
  }
  return [updateField, meta]
}
