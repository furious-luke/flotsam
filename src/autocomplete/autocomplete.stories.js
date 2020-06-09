import React from 'react'
import {storiesOf} from '@storybook/react'
import {ShortDecorator, Stateful} from '../helpers'
import {sleep} from '../utils'
import {Autocomplete} from './autocomplete'

async function loadOptions() {
  await sleep(1000)
  return [
    {
      label: 'Hello',
      value: 1
    },
    {
      label: 'World',
      value: 2
    }
  ]
}

storiesOf('Autocomplete', module)
  .addDecorator(ShortDecorator)
  .add('Demonstration', () => (
    <Stateful>
      <Autocomplete loadOptions={loadOptions} />
    </Stateful>
  ))
