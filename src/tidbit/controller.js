import React from 'react'
import {handleEvent} from 'tidbits/utils'
import {STATUS} from './status'

export function Controller({children, onChange, ...props}) {
  const controller = getControllerByName(props)
  async function handleSave() {
    onChange({meta: {status: STATUS.loading}})
    try {
      await controller.handleSave(props.value)
      onChange({meta: {status: STATUS.success}})
    }
    catch (e) {
      onChange({meta: {status: STATUS.failure}})
      throw e
    }
  }
  const childProps = {
    ...props,
    onChange: handleEvent(value => onChange({value})),
    controller
  }
  if (controller.handleSave) {
    childProps.onBlur = handleSave
  }
  return (
    React.Children.map(
      React.Children.only(children),
      child =>
        React.cloneElement(child, childProps)
    )
  )
}

function getControllerByName(props) {
  return (props.controller || {})[props.name] || {}
}
