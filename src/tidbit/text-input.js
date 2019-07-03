import React from 'react'
import {Input} from 'baseui/input'
import {Status, STATUS} from './status'
import {Controller} from './controller'

export function TextInput(props) {
  console.log(props.value)
  return (
    <Controller {...props}>
      <Input
        error={props.status == STATUS.failure}
        overrides={{
          After: {
            component: () => <Status status={props.status} />
          }
        }}
      />
    </Controller>
  )
}
