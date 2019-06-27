import React from 'react'
import {H6} from 'baseui/typography'
import {Block} from 'baseui/block'

export function CardHeader({title, children}) {
  return (
    <Block
      display="flex"
      marginBottom="1rem"
    >
      <Block font="font600">{title}</Block>
      <Block
        display="flex"
        justifyContent="flex-end"
        flex="1"
      >
        <Block>
          {children}
        </Block>
      </Block>
    </Block>
  )
}
