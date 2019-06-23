import React from 'react'
import {Timestamp} from 'tidbits/timestamp'

export function DraftTimestamp({value}) {
  return (
    <Timestamp
      prefix="Draft saved"
      value={value}
    />
  )
}
