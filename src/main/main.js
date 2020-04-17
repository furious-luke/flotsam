import React, {useEffect} from 'react'
import {useStyletron} from 'baseui'

import '../utils/debug'

import {Styletron} from './styletron'
import {GlobalStyles} from './GlobalStyles'

export function Main({theme, children}) {
  return (
    <Styletron theme={theme}>
      <GlobalStyles>
        {children}
      </GlobalStyles>
    </Styletron>
  )
}
