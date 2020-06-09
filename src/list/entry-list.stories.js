import React from 'react'
import uuidv4 from 'uuid/v4'
import {storiesOf} from '@storybook/react'
import {ShortDecorator, Stateful} from '../helpers'
import {EntryList} from './entry-list'

function itemFactory(content = '') {
  return {
    id: uuidv4(),
    content
  }
}

storiesOf('EntryList', module)
  .addDecorator(ShortDecorator)
  .add('Demonstration', () => (
    <Stateful valueProp="items" defaultValue={[]}>
      <EntryList itemFactory={itemFactory} />
    </Stateful>
  ))
  .add('Initial items', () => (
    <EntryList
      items={[
        itemFactory('Entry item 1'),
        itemFactory('Entry item 2'),
        itemFactory('Entry item 3')
      ]}
      itemFactory={itemFactory}
    />
  ))
