import * as React from 'react'
import {Select as BaseSelect, SIZE} from 'baseui/select'
import defaultProps from 'baseui/select/default-props'

import {useSelect} from './useSelect'

type SelectProps = {
  onChange?: Function,
  valueKey?: string,
  multi?: boolean,
  value?: any,
  full?: boolean
}

/**
 * A light-wrapper around BaseWeb's Select component.
 *
 * This aims to make managing values a little easier. Most basic
 * usages only care about the "value" of the selected option, which is
 * the default operation. By setting the "full" flag the full option
 * is returned instead of just the value. This tends to be useful for
 * autocomplete applications.
 */
export function Select({
  onChange,
  valueKey = defaultProps.valueKey,
  multi = defaultProps.multi,
  value,
  full,
  ...props
}: SelectProps) {
  const [_value, handleChange] = useSelect({value, multi, full, valueKey, onChange})
  return (
    <BaseSelect
      onChange={handleChange}
      valueKey={valueKey}
      value={_value}
      {...props}
    />
  )
}

Select.SIZE = SIZE
