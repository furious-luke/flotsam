import * as React from 'react'
import {Modal as BaseModal, ModalHeader, ModalBody, ModalFooter, ModalButton} from 'baseui/modal'

import {useToggle} from '../hooks/toggle'

export function Modal({
  open: initialOpen,
  trigger,
  triggerProp = 'onClick',
  children
}) {
  const [open, toggleOpen] = useToggle(initialOpen)
  return (
    <React.Fragment>
      {React.cloneElement(trigger, {[triggerProp]: toggleOpen})}
      <BaseModal onClose={toggleOpen} isOpen={open}>
        {children({onClose: toggleOpen})}
      </BaseModal>
    </React.Fragment>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.Button = ModalButton
