import React from 'react'
import {storiesOf} from '@storybook/react'
import {ShortDecorator, Stateful} from '../helpers'
import {CheckItem} from './check-item'

const item = {
  id: 1,
  content: 'This is a checkitem'
}

storiesOf('CheckItem', module)
  .addDecorator(ShortDecorator)
  .add('Demonstration', () => (
    <Stateful valueProp="checked">
      <CheckItem item={item} />
    </Stateful>
  ))
  .add('Empty', () => (
    <CheckItem />
  ))
  .add('Loading state', () => (
    <CheckItem item={item} status="loading" />
  ))
  .add('Success state', () => (
    <CheckItem item={item} status="success" />
  ))
  .add('Failure state', () => (
    <CheckItem item={item} status="failure" />
  ))
