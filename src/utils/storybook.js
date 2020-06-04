import React, {useState, useEffect, setGlobal, resetGlobal} from 'reactn'

export function Stateful({
  children,
  valueProp = 'value',
  onChangeProp = 'onChange',
  handleChange,
  defaultValue = '',
}) {
  const [value, setValue] = useState(defaultValue)
  let handler
  if (handleChange) {
    handler = (...args) => handleChange(value, setValue, ...args)
  } else {
    handler = (payload) => {
      setValue(payload)
    }
  }
  return React.cloneElement(React.Children.only(children), {
    [valueProp]: value,
    [onChangeProp]: handler,
  })
}

export function withStateful(props = {}) {
  return storyFn => (
    <Stateful {...props}>{storyFn()}</Stateful>
  )
}

export function GlobalState({state = {}, children}) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    resetGlobal()
    setGlobal(state, () => setReady(true))
  }, [])
  if (ready) {
    return children
  }
  return null
}

export function withGlobal(state = {}) {
  return storyFn => (
    <GlobalState state={state}>{storyFn()}</GlobalState>
  )
}

export function withPadding() {
  return storyFn => (
    <div
      style={{margin: '50px'}}
    >
      {storyFn()}
    </div>
  )
}
