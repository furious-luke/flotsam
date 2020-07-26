import React from 'react'
import {useNavigate} from '@reach/router'
import {Card} from 'baseui/card'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'

import {Form} from '../form'
import {Link} from '../link'

import {getCrudOptions} from './utils'

export function CrudForm({
  operation = OPERATION.create,
  title,
  loading,
  submit,
  submitTo,
  cancelTo,
  submitLabel,
  cancelLabel = 'Cancel',
  children
}) {
  const navigate = useNavigate()
  const options = getCrudOptions(operation, submitLabel)
  function handleSubmit() {
    if (submitTo) {
      navigate(submitTo)
    } else {
      navigate(-1)
    }
  }
  return (
    <Card title={`${options.verb} ${title}`}>
      <Form>
        {children}
      </Form>
      <Block display="flex" justifyContent="space-between" alignItems="center" paddingRight="scale1000">
        <Button
          type="submit"
          onClick={() => submit().then(handleSubmit)}
          disabled={loading}
          isLoading={loading}
          color={options.submitColor}
          $style={{minWidth: '8rem'}}
        >
          {options.submitLabel}
        </Button>
        <Link to={cancelTo || Link.TO.back}>{cancelLabel}</Link>
      </Block>
    </Card>
  )
}
