import React from 'react'
import {Grid, Cell} from 'baseui/layout-grid'

export function SingleCell({children}) {
  return (
    <Grid>
      <Cell span={[4, 4, 4]} skip={[0, 2, 4]}>
        {children}
      </Cell>
    </Grid>
  )
}
