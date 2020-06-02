import * as React from 'react'
import {useToggle} from '../hooks/toggle'

import {useWizard} from './useWizard'

export function Wizard({initialOpen, ...props}) {
  const [open, toggleOpen] = useToggle(initialOpen)
  const [key, setKey] = React.useState(0)
  function incrementKey() {
    setKey(key + 1)
  }
  return (
    <InnerWizard
      {...props}
      open={open}
      toggleOpen={toggleOpen}
      key={key}
      incrementKey={incrementKey}
    />
  )
}

function InnerWizard({
  modals,
  open,
  toggleOpen,
  triggerProp = 'onClick',
  trigger,
  incrementKey,
  children
}) {
  const [Modal, nextModal] = useWizard({modals})
  const _trigger = trigger || children
  function handleTrigger() {
    toggleOpen()
    incrementKey()
  }
  return (
    <React.Fragment>
      {_trigger && React.cloneElement(_trigger, {[triggerProp]: handleTrigger})}
      {Modal && (
        <Modal
          open={open}
          onCancel={toggleOpen}
          onProceed={nextModal}
        />
      )}
    </React.Fragment>
  )
}
