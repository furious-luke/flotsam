import React from 'react'
import {useStyletron} from 'baseui'
import {StatefulPopover} from 'baseui/popover'
import {StatefulMenu} from 'baseui/menu'

import {maybe} from '../utils/functional'

export function PopupMenu(props) {
  const {children, items, onItemSelect} = props
  const [css] = useStyletron()
  function handleSelect(item, close) {
    close()
    const {action} = item
    if (action) {
      action(item)
    }
    else {
      maybe(onItemSelect)(item)
    }
  }
  return (
    <StatefulPopover
      content={({close}) => (
        <StatefulMenu
          items={items}
          onItemSelect={({item}) => handleSelect(item, close)}
        />
      )}
    >
      <div className={css({cursor: 'pointer'})}>
        {children}
      </div>
    </StatefulPopover>
  )
}
