import React from 'react'
import {storiesOf} from '@storybook/react'
import {Card} from 'baseui/card'
import {BackgroundDecorator} from 'tidbits/helpers'
import {SplitContent} from './split-content'

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
