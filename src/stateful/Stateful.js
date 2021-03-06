import React, {useState} from 'react'

export function Stateful({
  children,
  valueProp = 'value',
  onChangeProp = 'onChange',
  handleChange,
  defaultValue = null
}) {
  const [value, setValue] = useState(defaultValue)
  let handler
  if (handleChange) {
    handler = (...args) => handleChange(value, setValue, ...args)
  } else {
    handler = payload => {
      setValue(payload)
    }
  }
  return React.cloneElement(React.Children.only(children), {
    [valueProp]: value,
    [onChangeProp]: handler
  })
}
