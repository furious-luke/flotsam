import React, {useState} from 'react'

export function useMeta(initialMeta) {
  const [meta, setMeta] = useState(initialMeta || {})

  function reduceMeta(newMeta) {
    setMeta({
      ...meta,
      ...newMeta,
      lastSuccess: newMeta.lastSuccess || meta.lastSuccess
    })
  }

  return [meta, reduceMeta]
}
