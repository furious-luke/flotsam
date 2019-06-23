import React from 'react'
import {storiesOf} from '@storybook/react'
import {Tidbit} from './tidbit'

storiesOf('Tidbit', module)
  .add('default', () => (
    <Tidbit prompt="The prompt?" />
  ))
