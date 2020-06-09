import React from 'react'
import {storiesOf} from '@storybook/react'
import {StatefulMenu} from 'baseui/menu'

import {ShortDecorator} from '../helpers'

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

function TestMenu() {
  return (
    <StatefulMenu
      items={items}
      overrides={{
        List: {
          style: {
            width: '10em'
          }
        }
      }}
    />
  )
}

function TestLabel({item}) {
  return (
    <h2>{item.label}</h2>
  )
}

storiesOf('List', module)
  .addDecorator(ShortDecorator)
  .add('Items with label', () => (
    <List items={items} contextMenu={TestMenu} />
  ))
  .add('Items with custom label', () => (
    <List
      items={items}
      contextMenu={TestMenu}
      labelComponent={TestLabel}
    />
  ))
