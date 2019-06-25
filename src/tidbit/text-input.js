import React from 'react'
import {Input} from 'baseui/input'
import {Status} from './status'

export function TextInput({status, ...props}) {
  return (
    <Input
      error={status == 'failure'}
      overrides={{
        After: {
          component: () => <Status status={status} />
        }
      }}
      {...props}
    />
  )
}
