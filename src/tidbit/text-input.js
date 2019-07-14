import React from 'react'
import {Input} from 'baseui/input'
import {Status, STATUS} from './status'

export function TextInput(props) {
  return (
    <Input
      error={props.status == STATUS.failure}
      overrides={{
        After: {
          component: () => <Status status={props.status} />
        }
      }}
    />
  )
}
