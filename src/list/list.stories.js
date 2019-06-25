import React from 'react'
import {storiesOf} from '@storybook/react'
import {StatefulMenu} from 'baseui/menu'
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

storiesOf('List', module)
  .addDecorator(ShortDecorator)
  .add('Items with label', () => (
    <List items={items} contextMenu={TestMenu} />
  ))
