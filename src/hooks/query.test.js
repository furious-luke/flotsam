import {renderHook, act} from '@testing-library/react-hooks'
import {useMutation as useMutationBase} from 'graphql-hooks'
import {STATUS} from '../utils/status'
import {useMutation} from './query'

jest.mock('graphql-hooks', () => ({
  useMutation: jest.fn()
}))

test('fails with missing query', () => {
  updateUseMutationMock(async () => ({}))
  expect(() => {
    const {result} = renderHook(() => useMutation())
    const hook = result.current
  }).toThrow()
})

test('mutate value', async () => {
  updateUseMutationMock(async () => ({}))
  const {result} = renderHook(
    () => useMutation('query{}')
  )
  const [mutate] = result.current
  await mutate()
})

test('mutate value with variable', async () => {
  updateUseMutationMock(async () => ({}))
  const {result} = renderHook(
    () => useMutation('query{}', {variable: 'name'})
  )
  const [mutate] = result.current
  await mutate()
})

test('mutate value with onMeta', async () => {
  updateUseMutationMock(
    async value => {
      expect(value).toEqual('hello')
      return {}
    }
  )
  let onMetaCalled = 0
  const {result} = renderHook(
    () => useMutation('query{}', {
      onMeta: meta => {
        if (onMetaCalled == 0) {
          onMetaCalled++
          expect(meta.status).toBe(null)
        }
      }
    })
  )
  const [mutate] = result.current
  await mutate('hello')
  expect(onMetaCalled).toEqual(1)
})

test('mutate value with variable and onMeta', async () => {
  updateUseMutationMock(
    async value => {
      expect(value).toEqual({name: 'hello'})
      return {}
    }
  )
  let onMetaCalled = 0
  const {result} = renderHook(
    () => useMutation('query{}', {
      variable: 'name',
      onMeta: meta=> {
        if (onMetaCalled == 0) {
          onMetaCalled++
          expect(meta.status).toBe(null)
        }
      }
    })
  )
  const [mutate] = result.current
  await mutate('hello')
  expect(onMetaCalled).toEqual(1)
})

test('errornous mutate value with onMeta', async () => {
  updateUseMutationMock(
    async value => {
      expect(value).toEqual({name: 'hello'})
      return {httpError: {body: '"error"'}, error: true}
    }
  )
  let onMetaCalled = 0
  const {result} = renderHook(
    () => useMutation('query{}', {
      variable: 'name',
      onMeta: meta => {
        if (onMetaCalled == 0) {
          onMetaCalled++
          expect(meta.status).toBe(null)
        }
      }
    })
  )
  const [mutate] = result.current
  // TODO: https://github.com/facebook/jest/issues/1700
  let error
  try {
    await mutate('hello')
  }
  catch(e) {
    error = e
  }
  expect(error).not.toBe(undefined)
  expect(onMetaCalled).toEqual(1)
})

function updateUseMutationMock(mockCall) {
  useMutationBase.mockImplementation(() => [mockCall, {}])
}
