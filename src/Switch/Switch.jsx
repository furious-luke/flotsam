import * as React from 'react'

import {isFunction} from '../utils/primitives'
import {useDebug} from '../useDebug'

export function Switch({as: Component, enabled, children, ...props}) {
  const isEnabled = evalFlag(enabled)
  if (!isEnabled) {
    return children
  }
  return <Component {...props}>children</Component>
}

export function DebugSwitch({as, children, ...props}) {
  const isDebug = useDebug()
  return <Switch as={as} enabled={isDebug} {...props}>{children}</Switch>
}

function evalFlag(flag) {
  if (isFunction(flag)) {
    return flag()
  }
  return !!flag
}
