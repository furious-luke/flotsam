import React, {useState} from 'react'
import {TreeView} from 'baseui/tree-view'
import {StyledEmptyState} from 'baseui/menu'
import {mergeOverrides} from 'baseui/helpers/overrides'

import {Select} from '../Select'
import {maybe} from '../utils/functional'
import {isNil, toggleKey, toArray} from '../utils/primitives'
import {filterKey} from '../utils/filter'
import {filterTree, transformTree, flattenLeaves, hasChildren} from '../utils/tree'

import {useFuseSearch} from './hooks'

export function TreeSelect({
  options,
  filterFunc = filterKey,
  startFilter = '',
  startExpanded = {},
  overrides: treeSelectOverrides = {},
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
  const leaves = flattenLeaves(expandedOptions)
  function onToggle(item) {
    setExpanded(toggleKey(expanded, item.id))
  }
  const overrides = mergeOverrides(
    {
      StatefulMenu: {
        component: TreeDropdown,
        props: {
          onToggle,
          expandedOptions
        }
      }
    },
    treeSelectOverrides
  )
  return (
    <Select
      options={leaves}
      onInputChange={handleInputChange}
      filterOptions={null}
      noResultsMsg={filter.length > 2 ? 'No results' : '3 characters required ...'}
      overrides={overrides}
      {...props}
    />
  )
}

function TreeDropdown({items, expandedOptions, onToggle, noResultsMsg, onItemSelect, ...props}) {
  const ungroupedItems = items.__ungrouped
  if (!ungroupedItems.length) {
    return <StyledEmptyState>{noResultsMsg}</StyledEmptyState>
  }
  return (
    <TreeView
      data={expandedOptions}
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
        },
        TreeLabel: {
          style: ({$theme}) => ({
            color: $theme.colors.contentPrimary,
            cursor: 'pointer'
          })
        }
      }}
    />
  )
}
