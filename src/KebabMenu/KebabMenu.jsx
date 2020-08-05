import React from 'react'
import {useStyletron} from 'baseui'
import Overflow from 'baseui/icon/overflow'

import {PopupMenu} from '../PopupMenu'

export function KebabMenu(props) {
  const {items, onItemSelect, size = 20} = props
  const [css] = useStyletron()
  return (
    <PopupMenu {...props}>
      <Overflow
        className={css({cursor: 'pointer'})}
        size={size}
      />
    </PopupMenu>
  )
}
