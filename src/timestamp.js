import React from 'react'
import formatRelative from 'date-fns/formatRelative'
import {Block} from 'baseui/block'

export function Timestamp({value, prefix = '', ...props}) {
  let text
  if (value) {
    if (prefix) {
      prefix += ' '
    }
    text = `${prefix}${formatRelative(value, new Date())}`
  }
  return (
    <Block
      font="font300"
      {...props}
    >
      {text}
    </Block>
  )
}
