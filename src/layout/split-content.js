import React from 'react'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import {Content} from './content'

const primaryItemProps = {
  overrides: {
    Block: {
      style: ({$theme}) => ({
        width: $theme.layout.primaryContent.width,
        flexGrow: 0
      })
    }
  }
}

const secondaryItemProps = {
  overrides: {
    Block: {
      style: ({$theme}) => ({
        width: $theme.layout.secondaryContent.width,
        flexGrow: 0
      })
    }
  }
}

export function SplitContent({children}) {
  return (
    <Content>
      <FlexGrid
        flexGridColumnCount={2}
        flexGridColumnGap="1rem"
        flexGridRowGap="1rem"
      >
        {
          React.Children.map(
            children,
            (child, index) =>
              <FlexGridItem
                {...((index % 2) ? secondaryItemProps : primaryItemProps)}
              >
                {child}
              </FlexGridItem>
          )
        }
      </FlexGrid>
    </Content>
  )
}
