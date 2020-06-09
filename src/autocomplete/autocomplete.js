import React, {useState} from 'react'
import {Select} from 'baseui/select'
import {StyledSpinnerNext as Spinner} from 'baseui/spinner'
import {Block} from 'baseui/block'
import {mergeOverrides} from 'baseui/helpers/overrides'

import {preventDefault} from '../utils/dom'
import {maybe, identity} from '../utils/functional'
import {isNullish, isArray} from '../utils/primitives'
import {Status, STATUS, isFailure, isLoading} from '../tidbit/status'
import {useDebounce} from '../hooks/debounce'

export function Autocomplete({
  value,
  onChange,
  loadOptions = identity,
  status,
  labelKey = 'label',
  valueKey = 'value',
  overrides: autocompleteOverrides,
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

  const overrides = mergeOverrides(
    {
      Dropdown: {
        component: loading && LoadingDropdown
      }
    },
    autocompleteOverrides
  )

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
      overrides={overrides}
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
