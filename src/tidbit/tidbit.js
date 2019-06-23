import React, {Fragment} from 'react'
import {H3} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {Button, KIND} from 'baseui/button'
import {useMutation} from 'tidbits/hooks/query'
import {useForm} from 'tidbits/hooks/form'
import {Flex} from 'tidbits/layout/flex'

export function Tidbit({
  prompt,
  mutation,
  onSave
}) {
  const {state: {values, errors}, update, save, saving} = useForm()
  const [executeMutation] = useMutation(mutation)
  async function saveHandler({values}) {
    await executeMutation({variables: values})
    if (onSave) {
      onSave()
    }
  }
  return (
    <Fragment>
      <H3>{prompt}</H3>
      <form style={{width: '20rem'}}>
        <FormControl>
          <Input
            onChange={update('email')}
            value={values.email || ''}
            disabled={saving}
            error={!!Object.keys(errors).length}
          />
        </FormControl>
        <Flex>
          <Button
            onClick={save(saveHandler)}
            isLoading={saving}
            disabled={saving}
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Fragment>
  )
}
