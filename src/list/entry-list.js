import React from 'react'
import {List, arrayMove} from 'baseui/dnd-list'
import {
  DragHandle,
  CloseHandle
} from 'baseui/dnd-list/styled-components'
import Grab from 'baseui/icon/grab'
import Delete from 'baseui/icon/delete'
import {Block} from 'baseui/block'
import {TextInput} from 'tidbits/tidbit/text-input'
import {handleEvent, arrayMutate, arrayExtend, isNil, isObject} from 'tidbits/utils'
import {useArrayWithPlaceholder} from 'tidbits/hooks/array'

export function EntryList({
  items = [],
  onChange,
  itemFactory,
  itemComponent = Label,
  itemComponentProps
}) {
  const [itemsWithPlaceholder, createPlaceholder] = useArrayWithPlaceholder(
    items, itemFactory, isItemEmpty
  )
  function handleChangeEntry(value, index) {
    if (isNil(index)) {
      throw new Error('EntryList requires both a value and index for onChange')
    }
    const valueObject = isObject(value) ? value : {content: value}
    const newItem = {
      ...itemsWithPlaceholder[index],
      ...valueObject
    }
    onChange(arrayMutate(items, newItem, index))
    if (index == items.length) {
      createPlaceholder()
    }
  }
  return (
    <List
      removable
      items={itemsWithPlaceholder}
      onChange={({oldIndex, newIndex}) => {}}
      overrides={{
        Item: {
          props: {
            onKeyDown: null,
            $listLength: itemsWithPlaceholder.length,
            tabIndex: -1
          },
          style: ({$index, $listLength}) => ({
            ':hover': 'none',
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            ...(($index == $listLength - 1) ? {boxShadow: null} : {}),
            ...(($index == $listLength - 1) ? {
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent'
            } : {}),
            ...(($index == $listLength - 1) ? {cursor: 'default'} : {})
          })
        },
        Label: {
          component: itemComponent,
          props: {
            onChange: handleChangeEntry,
            $listLength: itemsWithPlaceholder.length,
            ...(itemComponentProps || {})
          }
        },
        DragHandle: {
          props: {
            $listLength: itemsWithPlaceholder.length
          },
          style: ({$listLength, $index}) => ({
            visibility: ($index == $listLength - 1) ? 'hidden' : null
          })
        },
        CloseHandle: {
          props: {
            $listLength: itemsWithPlaceholder.length,
            tabIndex: -1
          },
          style: ({$listLength, $index}) => ({
            visibility: ($index == $listLength - 1) ? 'hidden' : null,
            ...(($index == $listLength - 1) ? {onClick: null} : {})
          })
        }
      }}
    />
  )
}

function isItemEmpty(item) {
  return !item || !item.content
}

function Label({$value, onChange, $listLength, ...props}) {
  return (
    <TextInput
      {...props}
      key={$value.id}
      value={$value.content}
      placeholder={(props.$index == $listLength - 1) ? 'Add a new item' : null}
      onChange={handleEvent(onChange, props.$index)}
    />
  )
}

function Item({$value, onChange, $listLength, ...props}) {
  const sharedProps = {
    $isRemovable: props.$isRemovable,
    $isDragged: props.$isDragged,
    $isSelected: props.$isSelected,
    $index: props.$index,
    $value
  }
  return (
    <Block
      {...props}
      key={$value.id}
      alignItems="center"
      padding=".2rem"
    >
      <DragHandle
        {...sharedProps}
        $style={{
          flexShrink: 0
        }}
      >
        {
          (props.$index != $listLength - 1) && (
            <Grab size={24} color="#CCC" />
          )
        }
      </DragHandle>
      <TextInput
        {...sharedProps}
        key={$value.id}
        value={$value.content}
        placeholder={(props.$index == $listLength - 1) ? 'Add a new item' : null}
        onChange={handleEvent(onChange, props.$index)}
      />
      <CloseHandle {...sharedProps}>
        <Delete size={24} color="#CCC" />
      </CloseHandle>
    </Block>
  )
}
