import React from 'react'
import {storiesOf} from '@storybook/react'
import {ShortDecorator, Stateful} from 'tidbits/helpers'
import {TextInput} from './text-input'

storiesOf('TextInput', module)
  .addDecorator(ShortDecorator)
  .add('Demonstration', () => (
    <Stateful>
      <TextInput />
    </Stateful>
  ))
  .add('Empty', () => (
    <TextInput value="" />
  ))
  .add('Loading state', () => (
    <TextInput value="" status="loading" />
  ))
  .add('Success state', () => (
    <TextInput value="" status="success" />
  ))
  .add('Failure state', () => (
    <TextInput value="" status="failure" />
  ))
