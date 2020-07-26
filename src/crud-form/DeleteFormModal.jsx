import React from 'react'
import {useNavigate} from '@reach/router'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'

import {Form} from '../form'
import {Modal} from '../Modal'
import {Link} from '../link'
import {maybe} from '../utils/functional'

export function DeleteFormModal({
  title,
  loading,
  submit,
  submitLabel = 'Delete',
  cancelLabel = 'Cancel',
  onClose,
  children
}) {
  const navigate = useNavigate()
  const verb = update ? 'Update' : 'Create'
  return (
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
            onClick={() => submit().then(maybe(onClose))}
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
  )
}
