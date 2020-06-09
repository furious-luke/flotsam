import * as React from 'react'

import {preventDefault} from '../utils/dom'

type FormProps = {
  $style?: object,
  children?: React.ReactNode
}

/**
 * A React form that provides sensible defaults and integrates with
 * BaseWeb.
 *
 * The form, by default, ignores the `onSubmit` handler. It also
 * accepts a `$style` prop to support consistent interface with
 * BaseWeb.
 */
export function Form({
  $style,
  children,
  ...props
}: FormProps) {
  return (
    <form onSubmit={preventDefault()} style={$style} {...props}>
      {children}
    </form>
  )
}
