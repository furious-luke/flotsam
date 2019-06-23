import React from 'react'
import {configure, addDecorator} from '@storybook/react'
import {Provider as StyletronProvider} from 'styletron-react'
import {Client as Styletron} from 'styletron-engine-atomic'
import {ThemeProvider} from 'baseui'
import Theme from 'tidbits/theme'

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}

function loadStories() {
  requireAll(require.context('../src/', true, /.stories\.js$/))
}

const engine = new Styletron()

addDecorator(storyFn => (
  <StyletronProvider value={engine}>
    <ThemeProvider theme={Theme}>
      {storyFn()}
    </ThemeProvider>
  </StyletronProvider>
))

configure(loadStories, module)
