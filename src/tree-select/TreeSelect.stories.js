import React from 'react'
import {withStateful} from 'kit/utils/storybook'
import {TreeSelect} from './TreeSelect'

export default {
  title: 'Input/Tree Select',
  component: TreeSelect,
  decorators: [
    withStateful()
  ]
}

export const withDefaults = () => (
  <TreeSelect
    options={getOptions()}
  />
)

export const opened = () => (
  <TreeSelect
    options={getOptions()}
    startOpen
  />
)

export const expanded = () => (
  <TreeSelect
    options={getOptions()}
    startExpanded={{1: true}}
    startOpen
  />
)

export const filtered = () => (
  <TreeSelect
    options={getOptions()}
    startFilter="green"
    startOpen
  />
)

function getOptions() {
  return [
    {
      id: 1,
      label: 'Red',
      children: [
        {
          id: 3,
          label: 'Green'
        }
      ]
    },
    {
      id: 2,
      label: 'Blue'
    }
  ]
}
