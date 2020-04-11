import React from 'react'

import '../utils/debug'

import {Styletron} from './styletron'
import {GlobalStyle} from './global-style'

export function Main({theme, children}) {
  return (
    <Styletron theme={theme}>
      <GlobalStyle>
        {children}
      </GlobalStyle>
    </Styletron>
  )
}
