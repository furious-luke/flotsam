import React from 'react'
import {Block} from 'baseui/block'
import {Spinner} from 'baseui/spinner'
import Check from 'baseui/icon/check'
import Alert from 'baseui/icon/alert'
import {STATUS} from '../utils/status'

export function Status({status}) {
  let Status
  if (status == STATUS.loading) {
    Status = Loading
  }
  if (status == STATUS.failure) {
    Status = Failure
  }
  if (status == STATUS.success) {
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
      $style={{
        animationDuration: '1s',
        animationDelay: '1s',
        animationFillMode: 'forwards',
        animationName: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0
          }
        }
      }}
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

function isFailure(status) {
  return status == STATUS.failure
}

function isLoading(status) {
  return status == STATUS.loading
}

export {
  STATUS,
  isFailure,
  isLoading
}
