import React from 'react'
import {preventDefault} from '../utils/dom'

export function Form({children, $style, ...props}) {
  return (
    <form onSubmit={preventDefault()} style={$style} {...props}>
      {children}
    </form>
  )
}
