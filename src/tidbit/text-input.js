import React from 'react'
import {Input} from 'baseui/input'
import {handleEvent} from 'tidbits/utils'
import {Status, STATUS} from './status'

export function TextInput({onChange, ...props}) {
  return (
    <Input
      onChange={handleEvent(onChange)}
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
