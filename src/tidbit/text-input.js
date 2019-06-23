import React from 'react'
import {Input} from 'baseui/input'
import {Flex} from 'tidbits/layout/flex'
import {Status} from './status'

export function TextInput({status, ...props}) {
  return (
    <Flex>
      <Input
        error={status == 'failure'}
        overrides={{
          After: {
            component: () => <Status status={status} />
          }
        }}
        {...props}
      />
    </Flex>
  )
}
