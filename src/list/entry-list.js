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
import {handleEvent, arrayMutate, arrayExtend} from 'tidbits/utils'
import {useArrayWithPlaceholder} from 'tidbits/hooks/array'

export function EntryList({
  items = [],
  onChange,
  itemFactory
}) {
  const [itemsWithPlaceholder, createPlaceholder] = useArrayWithPlaceholder(
    items, itemFactory, isItemEmpty
  )
  function handleChangeEntry(value, index) {
    const newItem = {
      ...itemsWithPlaceholder[index],
      content: value
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
          component: Item,
          props: {
            onChange: handleChangeEntry,
            listLength: itemsWithPlaceholder.length
          }
        }
      }}
    />
  )
}

function isItemEmpty(item) {
  return !item || !item.content
}

function Item({$value, onChange, listLength, ...props}) {
  return (
    <Block
      key={$value.id}
      display="flex"
      alignItems="center"
      padding=".2rem"
      {...props}
    >
      <DragHandle {...props}>
        {
          (props.$index != listLength - 1) && (
            <Grab size={24} color="#CCC" />
          )
        }
      </DragHandle>
      <TextInput
        key={$value.id}
        value={$value.content}
        placeholder={(props.$index == listLength - 1) ? 'Add a new item' : null}
        onChange={handleEvent(onChange, props.$index)}
      />
      <CloseHandle>
        <Delete size={24} color="#CCC" />
      </CloseHandle>
    </Block>
  )
}
