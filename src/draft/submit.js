import React from 'react'
import {Block} from 'baseui/block'
import {Button, SIZE} from 'baseui/button'
import {STATUS} from '../utils/status'

export function Submit({label, status, disabled, error, ...props}) {
  const loading = status == STATUS.loading
  return (
    <Block
      display="flex"
      alignItems="center"
      marginTop="2rem"
      marginBottom="2rem"
    >
      <Button
        {...props}
        isLoading={loading}
        disabled={disabled || loading}
        size={SIZE.compact}
      >
        {label || 'Submit'}
      </Button>
      <Block width="1rem" />
      {
        error && (
          <Block color="negative">
            {error}
          </Block>
        )
      }
    </Block>
  )
}
