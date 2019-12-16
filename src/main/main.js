import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import '../utils/debug'
import {Styletron} from './styletron'
import {GlobalStyle} from './global-style'

export function Main({theme, children}) {
  return (
    <Styletron theme={theme}>
      <BrowserRouter>
        <GlobalStyle>
          {children}
        </GlobalStyle>
      </BrowserRouter>
    </Styletron>
  )
}
