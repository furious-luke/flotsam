import React, {useState} from 'react'
import {Select} from 'baseui/select'
import {StyledSpinnerNext as Spinner} from 'baseui/spinner'
import {Block} from 'baseui/block'

import {preventDefault} from 'tidbits/utils/dom'
import {maybe} from 'tidbits/utils/functional'
import {isNullish, isArray} from 'tidbits/utils/primitives'
import {Status, STATUS, isFailure, isLoading} from 'tidbits/tidbit/status'
import {useDebounce} from 'tidbits/hooks/debounce'

export function Autocomplete({
  value,
  onChange,
  loadOptions,
  status,
  labelKey = 'label',
  valueKey = 'value',
  ...props
}) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const debounce = useDebounce()

  async function handleOpen() {
    setLoading(true)
    try {
      setOptions(await loadOptions())
    } finally {
      setLoading(false)
    }
  }

  async function handleInputChange(value) {
    setLoading(true)
    try {
      setOptions(await loadOptions(value))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Select
      value={isNullish(value) ? value : (isArray(value) ? value : [value])}
      error={isFailure(status)}
      disabled={isLoading(status)}
      onChange={o => maybe(onChange)(o.value[0])}
      options={options}
      onOpen={handleOpen}
      labelKey={labelKey}
      valueKey={valueKey}
      filterOptions={false}
      onInputChange={preventDefault(debounce(handleInputChange))}
      overrides={{
        Dropdown: {
          component: loading && LoadingDropdown
        }
      }}
      {...props}
    />
  )
}

// TODO: this is a class component to prevent warnings from BaseWeb
// about forwarding refs.
class LoadingDropdown extends React.Component {
  render() {
    return (
      <Block
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="1.9em"
        {...this.props}
      >
        <Spinner size={24} />
      </Block>
    )
  }
}
