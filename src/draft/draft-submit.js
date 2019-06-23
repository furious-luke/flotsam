import React from 'react'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {DraftTimestamp} from './draft-timestamp'

export function DraftSubmit({loading, disabled, lastUpdated}) {
  return (
    <Block
      display="flex"
      alignItems="center"
    >
      <Button
        isLoading={loading}
        disabled={disabled || loading}
      >
        Submit
      </Button>
      <Block flex="1" />
      <DraftTimestamp value={lastUpdated} />
    </Block>
  )
}
