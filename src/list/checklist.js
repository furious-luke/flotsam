import React from 'react'
import {Block} from 'baseui/block'

import {CheckItem} from '../tidbit/check-item'

export function Checklist({items, onChange}) {
  return (
    <Block>
      {items.map((item, index) => (
        <CheckItem
          item={item}
          checked={item.checked}
          onChange={value => onChange(value, index)}
        />
      ))}
    </Block>
  )
}
