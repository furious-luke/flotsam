import React from 'react'

import {preventDefault} from '../utils/dom'

export function PreventDefault({children, ...props}) {
  return (
    <span {...props} onClick={preventDefault()}>{children}</span>
  )
}
