import {useMemo} from 'react'
import Fuse from 'fuse.js'
import {flattenLeaves, growFromLeaves} from '../utils/tree'

export function useFuseSearch(options) {
  const leaves = useMemo(() => flattenLeaves(options), [options])
  const fuse = useMemo(() => new Fuse(leaves, {keys: ['label'], threshold: 0.3}), [options])
  function search(filter) {
    if (filter.length > 2) {
      const results = fuse.search(filter)
      return growFromLeaves(results)
    } else {
      return []
    }
  }
  return search
}
