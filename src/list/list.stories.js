import React from 'react'
import {storiesOf} from '@storybook/react'
import {ShortDecorator} from 'tidbits/helpers'
import {List} from './list'

const items = [
  {
    label: 'List item 1'
  },
  {
    label: 'List item 2'
  },
  {
    label: 'List item 3'
  }
]

storiesOf('List', module)
  .addDecorator(ShortDecorator)
  .add('Items with label', () => (
    <List items={items} />
  ))
