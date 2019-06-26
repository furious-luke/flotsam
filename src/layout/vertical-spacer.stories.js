import React from 'react'
import {storiesOf} from '@storybook/react'
import {Card} from 'baseui/card'
import {VerticalSpacer} from './vertical-spacer'

storiesOf('Layout/VerticalSpacer', module)
  .add('Default', () => (
    <VerticalSpacer>
      <Card>
        <h1>Item 1</h1>
      </Card>
      <Card>
        <h1>Item 2</h1>
      </Card>
    </VerticalSpacer>
  ))
