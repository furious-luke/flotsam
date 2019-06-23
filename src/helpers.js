import React, {useState} from 'react'
import {styled} from 'baseui'

export function ShortDecorator(storyFn) {
  return (
    <div style={{width: '20em'}}>
      {storyFn()}
    </div>
  )
}

export function BackgroundDecorator(storyFn) {
  return (
    <Background>
      {storyFn()}
    </Background>
  )
}

const Background = styled('div', ({$theme}) => ({
  paddingBottom: '3em',
  backgroundColor: $theme.colors.background
}))

export function Stateful({
  children,
  valueProp = 'value',
  onChangeProp = 'onChange',
  handleChange,
  defaultValue
}) {
  const [value, setValue] = useState(defaultValue)
  let handler
  if (handleChange) {
    handler = (...args) => handleChange(value, setValue, ...args)
  } else {
    handler = setValue
  }
  return (
    React.cloneElement(
      React.Children.only(children),
      {
        [valueProp]: value,
        [onChangeProp]: handler
      }
    )
  )
}
