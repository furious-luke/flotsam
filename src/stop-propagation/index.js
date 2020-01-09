import React from 'react'

import {stopPropagation} from '../utils/dom'

export function StopPropagation({children, ...props}) {
  return (
    <span {...props} onClick={stopPropagation()}>{children}</span>
  )
}
