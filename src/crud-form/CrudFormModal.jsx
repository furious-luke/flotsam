import React from 'react'
import {useNavigate} from '@reach/router'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'

import {Form} from '../form'
import {Modal} from '../Modal'
import {Link} from '../link'

export function CrudFormModal({
  update,
  title,
  loading,
  submit,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  trigger,
  children,
  ...props
}) {
  const navigate = useNavigate()
  const verb = update ? 'Update' : 'Create'
  return (
    <Modal trigger={trigger} {...props}>
      {({onClose}) => (
        <Form>
          <Modal.Header>{`${verb} ${title}`}</Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          <Modal.Footer>
            <Block
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingRight="scale1000"
            >
              <Button
                type="submit"
                onClick={() => submit().then(onClose)}
                disabled={loading}
                isLoading={loading}
                $style={{minWidth: '8rem'}}
              >
                {submitLabel}
              </Button>
              <Link onClick={onClose}>{cancelLabel}</Link>
            </Block>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  )
}
