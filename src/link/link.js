import React from 'react'
import {Link as RouterLink} from '@reach/router'
import {useNavigate} from '@reach/router'
import {StyledLink} from 'baseui/link'

import {preventDefault, stopPropagation} from '../utils/dom'

import {TO} from './constants'

export function Link({children, to, onClick, ...props}) {
  const navigate = useNavigate()
  const _to = to === TO.back ? undefined : to
  const _onClick = to === TO.back ? preventDefault(handleBack) : onClick
  const _as = to === TO.back ? undefined : RouterLink
  function handleBack() {
    navigate(-1)
  }
  return (
    <StyledLink
      $as={_as}
      to={_to}
      onClick={stopPropagation(_onClick)}
      href="#"
      {...props}
    >
      {children}
    </StyledLink>
  )
}

Link.TO = TO
