import React from 'react'
import {Block} from 'baseui/block'
import {StatefulMenu, StyledList, StyledListItem} from 'baseui/menu'
import {ItemMenu} from './item-menu'

export function List({items, emptyText, ...props}) {
  if (items.length) {
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
  } else {
    return (
      <Block
        font="font400"
        color="mono600"
        display="flex"
        justifyContent="center"
        paddingTop="1rem"
        paddingBottom="1rem"
      >
        <em>{emptyText || 'No items yet'}</em>
      </Block>
    )
  }
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
