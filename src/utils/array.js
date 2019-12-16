import {isEmpty} from './primitives'

export function ensurePlaceholder(items, itemFactory = () => '', isItemEmpty = isEmpty) {
  function shouldStripPlaceholder(item) {
    return isItemEmpty(item)
  }
  let toStrip = 0
  while (toStrip < items.length && shouldStripPlaceholder(items[items.length - toStrip - 1])) {
    toStrip += 1
  }
  if (toStrip === 0) {
    return [...items, itemFactory()]
  }
  return items.slice(0, items.length - (toStrip - 1))
}
