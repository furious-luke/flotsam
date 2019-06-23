import React from 'react'
import {storiesOf} from '@storybook/react'
import {ShortDecorator, Stateful} from 'tidbits/helpers'
import {Checkitem} from './checkitem'

const item = {
  id: 1,
  content: 'This is a checkitem'
}

storiesOf('Checkitem', module)
  .addDecorator(ShortDecorator)
  .add('Demonstration', () => (
    <Stateful valueProp="checked">
      <Checkitem item={item} />
    </Stateful>
  ))
  .add('Empty', () => (
    <Checkitem />
  ))
  .add('Loading state', () => (
    <Checkitem item={item} status="loading" />
  ))
  .add('Success state', () => (
    <Checkitem item={item} status="success" />
  ))
  .add('Failure state', () => (
    <Checkitem item={item} status="failure" />
  ))
