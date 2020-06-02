import * as React from 'react'
import {Modal as BaseModal, ModalHeader, ModalBody, ModalFooter, ModalButton} from 'baseui/modal'

import {useToggle} from '../hooks/toggle'
import {maybe} from '../utils/functional'

export function Modal({
  initialOpen,
  open: forceOpen,
  trigger,
  triggerProp = 'onClick',
  onCancel,
  onProceed,
  children
}) {
  const [open, toggleOpen] = useToggle(initialOpen)
  function handleClose(func) {
    return () => {
      toggleOpen()
      maybe(func)()
    }
  }
  const childProps = {
    onClose: handleClose(onCancel),
    onCancel: handleClose(onCancel),
    onProceed: handleClose(onProceed)
  }
  return (
    <React.Fragment>
      {trigger && React.cloneElement(trigger, {[triggerProp]: toggleOpen})}
      <BaseModal
        onClose={childProps.onClose}
        isOpen={getOpen(open, forceOpen)}
      >
        {children(childProps)}
      </BaseModal>
    </React.Fragment>
  )
}

function getOpen(open, forceOpen) {
  if (forceOpen !== undefined) {
    return forceOpen
  }
  return open
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.Button = ModalButton
