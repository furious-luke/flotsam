import React from 'react'
import {Spinner} from 'baseui/spinner'
import {Block} from 'baseui/block'
import {maybe} from '../utils/functional'

export function Placeholder({loading, children}) {
  if (loading) {
    return (
      <Block display="flex" width="100%" justifyContent="center">
        <Spinner />
      </Block>
    )
  } else {
    return maybe(children)()
  }
}
