import React from 'react'
import formatRelative from 'date-fns/formatRelative'
import {Label2} from 'baseui/typography'

export function Timestamp({value, prefix = ''}) {
  let text
  if (value) {
    if (prefix) {
      prefix += ' '
    }
    text = `${prefix}${formatRelative(value, new Date())}`
  }
  return <Label2>{text}</Label2>
}
