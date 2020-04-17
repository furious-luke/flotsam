import React from 'react'
import {Grid, Cell} from 'baseui/layout-grid'

import {matchChildren} from '../utils/components'

export function DualCell({children}) {
  const [leftContent, rightContent] = matchChildren(children, [LeftContent, RightContent])
  return (
    <Grid>
      <Cell span={2}>
        {leftContent}
      </Cell>
      <Cell span={10}>
        {rightContent}
      </Cell>
    </Grid>
  )
}

function LeftContent({children}) {
  return <>{children}</>
}

function RightContent({children}) {
  return <>{children}</>
}

DualCell.LeftContent = LeftContent
DualCell.RightContent = RightContent
