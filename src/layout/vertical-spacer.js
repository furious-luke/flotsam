import React from 'react'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'

export function VerticalSpacer({children}) {
  return (
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap="separation"
    >
      {
        React.Children.map(
          children,
          (child, index) =>
            <FlexGridItem>
              {child}
            </FlexGridItem>
        )
      }
    </FlexGrid>
  )
}
