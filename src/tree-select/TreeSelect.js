import React, {useState} from 'react'
import {Select} from 'baseui/select'
import {Unstable_TreeView as TreeView} from 'baseui/tree-view'
import {StyledEmptyState} from 'baseui/menu'
import {maybe} from '../utils/functional'
import {isNil, toggleKey} from '../utils/primitives'
import {filterKey} from '../utils/filter'
import {filterTree, transformTree, hasChildren} from '../utils/tree'
import {useFuseSearch} from './hooks'

export function TreeSelect({
  options,
  onChange,
  filterFunc = filterKey,
  startFilter = '',
  startExpanded = {},
  value,
  ...props
}) {
  const [expanded, setExpanded] = useState(startExpanded)
  const [filter, setFilter] = useState(startFilter)
  const search = useFuseSearch(options)
  function handleInputChange(event) {
    setFilter(event.target.value)
  }
  const filteredOptions = filter ? search(filter) : options
  const transformFunc = filter ? node => ({...node, isExpanded: true}) : node => ({...node, isExpanded: expanded[node.id]})
  const expandedOptions = transformTree(filteredOptions, transformFunc)
  function onToggle(item) {
    setExpanded(toggleKey(expanded, item.id))
  }
  return (
    <Select
      {...props}
      value={value}
      options={expandedOptions}
      onInputChange={handleInputChange}
      onChange={maybe(onChange)}
      filterOptions={null}
      noResultsMsg={filter.length > 2 ? 'No results' : '3 characters required ...'}
      overrides={{
        StatefulMenu: {
          component: TreeDropdown,
          props: {
            onToggle
          }
        }
      }}
    />
  )
}

function TreeDropdown({items, onToggle, noResultsMsg, onItemSelect, ...props}) {
  if (!items.length) {
    return <StyledEmptyState>{noResultsMsg}</StyledEmptyState>
  }
  return (
    <TreeView
      data={items}
      onToggle={item => {
        if (hasChildren(item)) {
          maybe(onToggle)(item)
        } else {
          maybe(onItemSelect)({item})
        }
      }}
      overrides={{
        Root: {
          style: {
            maxHeight: '300px'
          }
        },
        TreeItemContent: {
          style: {
            cursor: 'pointer'
          }
        }
      }}
    />
  )
}
