import React from 'react'
import {storiesOf} from '@storybook/react'
import {ShortDecorator} from 'tidbits/helpers'
import {DraftSubmit} from './draft-submit'

const lastUpdated = new Date('December 17, 1995 03:24:00')

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
