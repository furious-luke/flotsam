import * as React from 'react'
import {Select as BaseSelect} from 'baseui/select'
import defaultProps from 'baseui/select/default-props'

import {toArray, isEmpty} from '../utils/primitives'
import {maybe} from '../utils/functional'

export function Select({
  onChange,
  valueKey = defaultProps.valueKey,
  multi = defaultProps.multi,
  value,
  ...props
}) {
  function handleChange({value = []}) {
    let mapped = value.map(v => v[valueKey])
    if (!multi) {
      mapped = mapped[0]
    }
    return maybe(onChange)(mapped)
  }
  function toValue(value) {
    if (isEmpty(value)) {
      return value
    }
    return toArray(value).map(v => ({[valueKey]: v}))
  }
  return <BaseSelect onChange={handleChange} valueKey={valueKey} value={toValue(value)} {...props} />
}
