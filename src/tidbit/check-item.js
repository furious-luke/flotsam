import React from 'react'
import {Block} from 'baseui/block'
import {Checkbox} from 'baseui/checkbox'
import {Status} from './status'

export function CheckItem({item, checked, status, onChange, ...props}) {
  return (
    <Block
      display="flex"
      alignItems="center"
      padding=".5em"
    >
      <Checkbox
        checked={checked}
        onChange={() => onChange(!checked)}
        {...props}
      >
        {item ? item.content : ''}
      </Checkbox>
      <Block flex="1" />
      <Status status={status}/>
    </Block>
  )
}
