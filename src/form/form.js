import React from 'react'
import {preventDefault} from '../utils/dom'

export function Form({children}) {
  return (
    <form onSubmit={preventDefault()}>
      {children}
    </form>
  )
}
