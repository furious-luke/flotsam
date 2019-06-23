import React from 'react'
import {storiesOf} from '@storybook/react'
import {ShortDecorator} from 'tidbits/helpers'
import {TextInput} from './text-input'

storiesOf('TextInput', module)
  .addDecorator(ShortDecorator)
  .add('Empty', () => (
    <TextInput />
  ))
  .add('Loading state', () => (
    <TextInput status="loading" />
  ))
  .add('Success state', () => (
    <TextInput status="success" />
  ))
  .add('Failure state', () => (
    <TextInput status="failure" />
  ))
