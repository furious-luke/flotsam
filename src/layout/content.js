import React from 'react'
import {styled} from 'baseui'

export function Content({children, fullHeight, backgroundColor = null}) {
  return (
    <StyledContent
      $style={{
        height: fullHeight ? '100%' : null,
        backgroundColor
      }}
    >
      {children}
    </StyledContent>
  )
}

const StyledContent = styled('div', ({$theme}) => ({
  ...$theme.layout.content
}))
