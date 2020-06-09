import React from 'react'
import {storiesOf} from '@storybook/react'
import {Block} from 'baseui/block'
import {Card} from 'baseui/card'

import {BackgroundDecorator} from '../helpers'

import {SplitContent} from './split-content'
import {VerticalSpacer} from './vertical-spacer'

storiesOf('Layout/SplitContent', module)
  .addDecorator(BackgroundDecorator)
  .add('Single items', () => (
    <SplitContent>
      <Card>
        <h1>Primary</h1>
      </Card>
    </SplitContent>
  ))
  .add('Several rows', () => (
    <SplitContent>
      <Card>
        <h1>Primary</h1>
      </Card>
      <Card>
        <h2>Secondary</h2>
      </Card>
      <Card>
        <h1>Primary</h1>
      </Card>
      <Card>
        <h2>Secondary</h2>
      </Card>
    </SplitContent>
  ))
  .add('Blocked columns', () => (
    <SplitContent>
      <VerticalSpacer>
        <Card>
          <h1>Primary</h1>
        </Card>
        <Card>
          <h1>Primary</h1>
        </Card>
      </VerticalSpacer>
      <VerticalSpacer>
        <Card>
          <h2>Secondary</h2>
        </Card>
      </VerticalSpacer>
    </SplitContent>
  ))
