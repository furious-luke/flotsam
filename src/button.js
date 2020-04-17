import React from 'react'
import {useNavigate} from '@reach/router'
import {Button as BaseButton, SIZE} from 'baseui/button'

export function Button({to, ...props}) {
  const navigate = useNavigate()
  function handleClick() {
    if (to) {
      navigate(to)
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
