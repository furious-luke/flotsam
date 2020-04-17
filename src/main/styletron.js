import React from 'react'
import {Client as StyletronClient} from 'styletron-engine-atomic'
import {Provider as StyletronProvider} from 'styletron-react'
import {LightTheme, BaseProvider} from 'baseui'

const engine = new StyletronClient()

export function Styletron({theme = LightTheme, children}) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme}>
        {children}
      </BaseProvider>
    </StyletronProvider>
  )
}
