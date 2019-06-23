import React from 'react'
import {StatefulMenu} from 'baseui/menu'

export function List({items, onSelect}) {
  return (
    <StatefulMenu
      items={items}
      onItemSelect={onSelect}
      overrides={{
        List: {
          style: {
            boxShadow: 'none'
          }
        }
      }}
    />
  )
}
