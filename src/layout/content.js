import React from 'react'
import {styled} from 'baseui'

import {deref} from '../utils/primitives'

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

const StyledContent = styled('div', ({$theme}) => {
  return {
    ...deref($theme, 'layout.content', {})
  }
})
