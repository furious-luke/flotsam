import React from 'react'
import {Input} from 'baseui/input'
import {preventDefault} from '../utils/dom'
import {Status, STATUS} from './status'

export function TextInput({onChange, ...props}) {
  return (
    <Input
      onChange={preventDefault(onChange)}
      error={props.status == STATUS.failure}
      disabled={props.status == STATUS.loading}
      overrides={{
        After: {
          component: Status,
          props: {
            status: props.status
          }
        }
      }}
      {...props}
    />
  )
}
