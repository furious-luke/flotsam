import React from 'react'
import {Block} from 'baseui/block'
import {Button, SIZE} from 'baseui/button'
import {DraftTimestamp} from './draft-timestamp'

export function DraftSubmit({onSubmit, loading, disabled, lastUpdated}) {
  return (
    <Block
      display="flex"
      alignItems="center"
      marginTop="2rem"
      marginBottom="2rem"
    >
      <Button
        onClick={onSubmit}
        isLoading={loading}
        disabled={disabled || loading}
        size={SIZE.compact}
      >
        Submit
      </Button>
      <Block width="1rem" />
      <DraftTimestamp value={lastUpdated} />
    </Block>
  )
}
