import React from 'react'
import {storiesOf} from '@storybook/react'
import {ShortDecorator, Stateful} from 'tidbits/helpers'
import {Textarea} from './textarea'

const TEXTAREA_VALUE = 'Hello world, this is a textarea.'
const TEXTAREA_LASTSAVED = new Date('December 17, 1995 03:24:00')

storiesOf('Textarea', module)
  .add('Demonstration', () => (
    <Stateful>
      <Textarea />
    </Stateful>
  ))
  .add('No status', () => (
    <Textarea
      value={TEXTAREA_VALUE}
      lastSaved={TEXTAREA_LASTSAVED}
    />
  ))
  .add('Loading status', () => (
    <Textarea
      value={TEXTAREA_VALUE}
      status="loading"
      lastSaved={TEXTAREA_LASTSAVED}
    />
  ))
  .add('Success status', () => (
    <Textarea
      value={TEXTAREA_VALUE}
      status="success"
      lastSaved={TEXTAREA_LASTSAVED}
    />
  ))
  .add('Failure status', () => (
    <Textarea
      value={TEXTAREA_VALUE}
      status="failure"
      lastSaved={TEXTAREA_LASTSAVED}
    />
  ))
