import React from 'react'
import {hot} from 'react-hot-loader/root'
import {Main} from './main'

function HotMain({children}) {
  return (
    <Main>{children}</Main>
  )
}

export default hot(HotMain)
