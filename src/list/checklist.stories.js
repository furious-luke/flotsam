import React from 'react'
import uuidv4 from 'uuid/v4'
import {storiesOf} from '@storybook/react'
import {ShortDecorator, Stateful} from '../helpers'
import {arrayMutate} from '../utils'
import {Checklist} from './checklist'

const items = [
  {
    id: 1,
    content: 'Checkable item 1',
    checked: false
  },
  {
    id: 2,
    content: 'Checkable item 2',
    checked: false
  },
  {
    id: 3,
    content: 'Checkable item 3',
    checked: false
  }
]

storiesOf('Checklist', module)
  .addDecorator(ShortDecorator)
  .add('Demonstration', () => (
    <Stateful
      valueProp="items"
      defaultValue={items}
      handleChange={(items, onChange, value, index) => (
        onChange(arrayMutate(items, {...items[index], checked: value}, index))
      )}
    >
      <Checklist />
    </Stateful>
  ))
