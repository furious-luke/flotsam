import * as React from 'reactn'

import {useGlobal} from '../useGlobal'

import {LoginPage} from './LoginPage'

export function LoginRequired({children}) {
  const [auth = {}, setAuth] = useGlobal('auth')
  if (!auth.user) {
    return <LoginPage  />
  }
  return children
}
