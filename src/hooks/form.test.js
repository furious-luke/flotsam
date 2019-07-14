import {renderHook, act} from '@testing-library/react-hooks'
import {useForm} from './form'

test('values default to object', () => {
  const {result} = renderHook(() => useForm())
  const [values, updateValues] = result.current
  expect(values).toMatchObject({})
})

test('fields default to empty string', () => {
  const {result} = renderHook(() => useForm())
  const [values, updateValues] = result.current
  expect(values.test).toBe('')
})

test('update values as function', () => {
  const {result} = renderHook(() => useForm())
  let [values, updateValues] = result.current
  act(() => updateValues({hello: 'a', world: 'b'}))
  values = result.current[0]
  expect(values).toMatchObject({hello: 'a', world: 'b'})
})

test('proxy updates fields', () => {
  const {result} = renderHook(() => useForm())
  let [values, updateValues] = result.current
  act(() => updateValues.hello('a'))
  values = result.current[0]
  updateValues = result.current[1]
  expect(values).toMatchObject({hello: 'a'})
  act(() => updateValues.world('b'))
  values = result.current[0]
  expect(values).toMatchObject({hello: 'a', world: 'b'})
})
