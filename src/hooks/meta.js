import React, {useState} from 'react'

export function useMeta() {
  const [meta, setMeta] = useState({})

  function reduceMeta(newMeta) {
    setMeta({
      ...meta,
      ...newMeta,
      lastSuccess: newMeta.lastSuccess || meta.lastSuccess
    })
  }

  return [meta, reduceMeta]
}
