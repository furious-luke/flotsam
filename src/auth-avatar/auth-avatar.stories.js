import React from 'react'
import {storiesOf} from '@storybook/react'
import {styled} from 'baseui'
import {AuthAvatar} from './auth-avatar'

const USER = {
  email: 'test@test.org',
  name: 'Test User'
}

const Background = styled('div', ({$theme}) => ({
  paddingBottom: '3em',
  backgroundColor: $theme.colors.header
}))

storiesOf('AuthAvatar', module)
  .add('Logged out', () => (
    <Background>
      <AuthAvatar />
    </Background>
  ))
  .add('Logged in', () => (
    <Background>
      <AuthAvatar user={USER} />
    </Background>
  ))
