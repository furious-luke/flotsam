import {useState} from 'react'
import {arrayExtend} from '../utils'
import {isNullish} from '../utils/primitives'

export function useArrayWithPlaceholder(
  items,
  itemFactory = () => '',
  isItemEmpty = isNullish
) {
  function shouldCreatePlaceholder() {
    return !items || items.length == 0 || !isItemEmpty(items[items.length - 1])
  }
  const [value, setValue] = useState()
  const [placeholder, setPlaceholder] = useState(shouldCreatePlaceholder() ? itemFactory() : null)
  function createPlaceholderIfNeeded() {
      setPlaceholder(itemFactory())
  }
  return [arrayExtend(items, placeholder), createPlaceholderIfNeeded]
}
