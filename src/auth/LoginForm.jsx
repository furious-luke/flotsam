import * as React from 'react'
import {FormControl} from 'baseui/form-control'
import {Button} from 'baseui/button'
import {Input} from 'baseui/input'

import {Form} from '../form'

import {useLoginForm} from './useLoginForm'

export function LoginForm(props) {
  const [
    login,
    updateLogin,
    submit,
    {
      loading,
      errors
    }
  ] = useLoginForm(props.login)
  return (
    <Form>
      <FormControl label="Email" error={errors}>
        <Input
          type="email"
          value={login.email}
          onChange={updateLogin.email}
          disabled={loading}
        />
      </FormControl>
      <FormControl label="Password">
        <Input
          type="password"
          value={login.password}
          onChange={updateLogin.password}
          disabled={loading}
        />
      </FormControl>
      <Button
        type="submit"
        onClick={submit}
        disabled={loading}
        isLoading={loading}
      >
        Login
      </Button>
    </Form>
  )
}
