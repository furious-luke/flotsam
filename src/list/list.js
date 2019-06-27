import React from 'react'
import {Block} from 'baseui/block'
import {StatefulMenu, StyledList, StyledListItem} from 'baseui/menu'
import {ItemMenu} from './item-menu'

export function List({items, ...props}) {
  return (
    <StyledList
      $style={{
        display: 'block',
        boxShadow: 'none'
      }}
    >
      {items.map(item => <ListItem {...props} item={item} />)}
    </StyledList>
  )
}

function ListItem({item, contextMenu: ContextMenu, ...props}) {
  return (
    <Block
      display="flex"
      alignItems="center"
      width="100%"
    >
      <StyledListItem
        $style={({$theme}) => ({
          ':hover': {
            backgroundColor: $theme.colors.menuFillHover
          },
          flexGrow: 1,
          paddingTop: '.8em',
          paddingBottom: '.8em',
          ...$theme.typography.font400
        })}
        {...props}
      >
        {item.label}
      </StyledListItem>
      {
        ContextMenu && (
          <ItemMenu>
            <ContextMenu />
          </ItemMenu>
        )
      }
    </Block>
  )
}
