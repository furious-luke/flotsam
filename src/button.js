import React from 'react'
import useReactRouter from 'use-react-router'
import {Button as BaseButton, SIZE} from 'baseui/button'

export function Button({to, ...props}) {
  const {history} = useReactRouter()
  function handleClick() {
    if (to) {
      history.push(to)
    }
  }
  return (
    <BaseButton
      onClick={handleClick}
      {...props}
    />
  )
}

export {SIZE}
