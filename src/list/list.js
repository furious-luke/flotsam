import React from 'react'
import {Block} from 'baseui/block'
import {StatefulMenu, StyledListItem} from 'baseui/menu'
import {ItemMenu} from './item-menu'

export function List({items, onSelect, contextMenu}) {
  return (
    <StatefulMenu
      items={items}
      onItemSelect={onSelect}
      overrides={{
        List: {
          style: {
            boxShadow: 'none'
          }
        },
        ListItem: {
          component: ListItem,
          style: {
            width: '100%'
          },
          props: {
            contextMenu
          }
        }
      }}
    />
  )
}

function ListItem({children, contextMenu: ContextMenu, ...props}) {
  return (
    <Block
      display="flex"
      alignItems="center"
      width="100%"
    >
      <StyledListItem {...props}>{children}</StyledListItem>
      <ItemMenu>
        <ContextMenu />
      </ItemMenu>
    </Block>
  )
}
