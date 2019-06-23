import React from 'react'
import {Block} from 'baseui/block'
import {Checkitem} from 'tidbits/tidbit/checkitem'

export function Checklist({items, onChange}) {
  return (
    <Block>
      {items.map((item, index) => (
        <Checkitem
          item={item}
          checked={item.checked}
          onChange={value => onChange(value, index)}
        />
      ))}
    </Block>
  )
}
