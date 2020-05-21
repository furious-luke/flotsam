import React from 'react'
import {StyledSpinnerNext as Spinner} from 'baseui/spinner'
import {Block} from 'baseui/block'
import {maybe} from '../utils/functional'

export function Placeholder({loading, children, ...props}) {
  if (loading) {
    return (
      <Block display="flex" width="100%" justifyContent="center" {...props}>
        <Spinner />
      </Block>
    )
  } else {
    return maybe(children)()
  }
}
