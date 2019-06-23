import React from 'react'
import addSeconds from 'date-fns/addSeconds'
import {storiesOf} from '@storybook/react'
import {ShortDecorator} from 'tidbits/helpers'
import {DraftSubmit} from './draft-submit'

const lastUpdated = addSeconds(new Date(), -30)

storiesOf('DraftSubmit', module)
  .addDecorator(ShortDecorator)
  .add('No last updated', () => (
    <DraftSubmit />
  ))
  .add('With last updated', () => (
    <DraftSubmit lastUpdated={lastUpdated} />
  ))
  .add('Disabled', () => (
    <DraftSubmit disabled lastUpdated={lastUpdated} />
  ))
  .add('Loading', () => (
    <DraftSubmit loading lastUpdated={lastUpdated} />
  ))
