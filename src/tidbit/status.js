import React from 'react'
import {Block} from 'baseui/block'
import {Spinner} from 'baseui/spinner'
import Check from 'baseui/icon/check'
import Alert from 'baseui/icon/alert'

export function Status({status}) {
  let Status
  if (status == 'loading') {
    Status = Loading
  }
  if (status == 'failure') {
    Status = Failure
  }
  if (status == 'success') {
    Status = Success
  }
  return (
    <Block
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="3rem"
    >
      {Status && <Status />}
    </Block>
  )
}

function Loading() {
  return (
    <Block
      display="flex"
      alignItems="center"
    >
      <Spinner size="1.5rem" />
    </Block>
  )
}

function Success() {
  return (
    <Block
      display="flex"
      alignItems="center"
      color="positive400"
    >
      <Check size="1.5rem" />
    </Block>
  )
}

function Failure() {
  return (
    <Block
      display="flex"
      alignItems="center"
      color="negative400"
    >
      <Alert size="1.5rem" />
    </Block>
  )
}
