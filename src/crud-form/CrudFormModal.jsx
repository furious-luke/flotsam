import React from 'react'
import {useNavigate} from '@reach/router'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'

import {Form} from '../form'
import {Modal} from '../Modal'
import {Link} from '../link'
import {maybe} from '../utils/functional'

import {OPERATION} from './constants'
import {getCrudOptions} from './utils'

export function CrudFormModal({
  operation = OPERATION.create,
  title,
  loading,
  submit,
  submitLabel,
  cancelLabel = 'Cancel',
  onClose,
  children
}) {
  const navigate = useNavigate()
  const options = getCrudOptions(operation)
  return (
    <Form>
      <Modal.Header>{`${options.verb} ${title}`}</Modal.Header>
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
            color={options.submitColor}
            $style={{minWidth: '8rem'}}
          >
            {options.submitLabel}
          </Button>
          <Link onClick={onClose}>{cancelLabel}</Link>
        </Block>
      </Modal.Footer>
    </Form>
  )
}
