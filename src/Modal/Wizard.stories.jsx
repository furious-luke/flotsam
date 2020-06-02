import * as React from 'react'

import {Button} from '../Button'

import {Modal} from './Modal'

export default {
  title: 'Modal',
  component: Modal
}

export const demonstration = () => <TestWizard />

function TestWizard() {
  const modals = [
    {
      hook: () => true,
      modal: TestModal
    }
  return (
    <Wizard modals={modals} />
  )
}

function TestModal() {
  return (
    <Modal trigger={<Button>Toggle</Button>}>
      {({onClose}) => (
        <React.Fragment>
          <Modal.Header>This is the header</Modal.Header>
          <Modal.Body>This is the body.</Modal.Body>
          <Modal.Footer>
            <Modal.Button kind="tertiary" onClick={onClose}>Cancel</Modal.Button>
            <Modal.Button onClick={onClose}>Okay</Modal.Button>
          </Modal.Footer>
        </React.Fragment>
      )}
    </Modal>
  )
}
