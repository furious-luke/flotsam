import * as React from 'react'
import {Router} from '@reach/router'

import {LoginPage} from './LoginPage'

export function AuthMain() {
  return (
    <React.Fragment>
      <Router>
        <LoginPage path="login" />
      </Router>
    </React.Fragment>
  )
}
