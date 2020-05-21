import * as React from 'react'
import {Select as BaseSelect} from 'baseui/select'

import {maybe} from 'tidbits/utils/functional'

export function Select({onChange, ...props}) {
  function handleChange({value}) {
    return maybe(onChange)(value)
  }
  return <BaseSelect onChange={handleChange} {...props} />
}
