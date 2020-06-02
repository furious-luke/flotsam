import * as React from 'react'
import {configure, addDecorator} from '@storybook/react'
import {LocationProvider, createMemorySource, createHistory as createRouterHistory} from '@reach/router'

import {Main} from '../src/main'
import theme from '../src/theme'

configure(require.context('../src', true, /\.stories\.jsx?$/), module)

let firstHistoryObject = null
function createHistory(initialPath) {
  if (firstHistoryObject) {
    firstHistoryObject.navigate(initialPath)
    return firstHistoryObject
  }

  const source = createMemorySource(initialPath)
  firstHistoryObject = createRouterHistory(source)
  firstHistoryObject.listen(() =>
    console.log('message arrived at router', source.location)
  )
  return firstHistoryObject
}

addDecorator(storyFn => (
  <Main theme={theme}>
    <LocationProvider history={createHistory('/')}>
      {storyFn()}
    </LocationProvider>
  </Main>
))
