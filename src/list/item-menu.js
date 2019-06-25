import React from 'react'
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from 'baseui/popover'
import {Braille} from 'tidbits/icons/braille'

export function ItemMenu({children}) {
  return (
    <StatefulPopover
      showArrow
      content={children}
      placement={PLACEMENT.right}
      triggerType={TRIGGER_TYPE.hover}
      accessibilityType="tooltip"
    >
      <Braille
        $style={{
          paddingLeft: '.5em',
          paddingRight: '.5em'
        }}
      />
    </StatefulPopover>
  )
}
