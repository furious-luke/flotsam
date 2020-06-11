import {renderHook, act} from '@testing-library/react-hooks'

import {useSelect} from './useSelect'

describe('useSelect', () => {
  describe('returns value', () => {
    it('as is in array when full is set', () => {
      const {result} = renderHook(() => useSelect({
        value: {id: 'a'},
        multi: true,
        full: true,
        valueKey: 'id'
      }))
      expect(result.current[0]).toEqual([{id: 'a'}])
    })

    it('as object in array', () => {
      const {result} = renderHook(() => useSelect({
        value: 'a',
        multi: true,
        valueKey: 'id'
      }))
      expect(result.current[0]).toEqual([{id: 'a'}])
    })
  })

  describe('change handler is called with', () => {
    it('object in array when multi and full are set', () => {
      const onChange = jest.fn()
      const {result} = renderHook(() => useSelect({
        multi: true,
        full: true,
        valueKey: 'id',
        onChange
      }))
      const value = [{id: 'a'}]
      result.current[1]({value})
      expect(onChange).toHaveBeenLastCalledWith(value)
    })

    it('value in array when multi is set', () => {
      const onChange = jest.fn()
      const {result} = renderHook(() => useSelect({
        multi: true,
        valueKey: 'id',
        onChange
      }))
      const value = [{id: 'a'}]
      result.current[1]({value})
      expect(onChange).toHaveBeenLastCalledWith(['a'])
    })

    it('object when full is set', () => {
      const onChange = jest.fn()
      const {result} = renderHook(() => useSelect({
        full: true,
        valueKey: 'id',
        onChange
      }))
      const value = [{id: 'a'}]
      result.current[1]({value})
      expect(onChange).toHaveBeenLastCalledWith(value[0])
    })

    it('value', () => {
      const onChange = jest.fn()
      const {result} = renderHook(() => useSelect({
        valueKey: 'id',
        onChange
      }))
      const value = [{id: 'a'}]
      result.current[1]({value})
      expect(onChange).toHaveBeenLastCalledWith('a')
    })
  })
})
