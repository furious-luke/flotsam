import * as React from 'react'
import {Checkbox as BaseCheckbox, STYLE_TYPE} from 'baseui/checkbox'

import {maybe} from '../utils/functional'

export function Checkbox({onChange, value, checked, ...props}) {
  function handleChange(e) {
    maybe(onChange)(e.target.checked)
  }
  const _checked = checked === undefined ? value : checked
  return <BaseCheckbox {...props} onChange={handleChange} checked={_checked} />
}

Checkbox.STYLE_TYPE = STYLE_TYPE
