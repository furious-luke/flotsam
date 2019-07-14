import {renderHook, act} from '@testing-library/react-hooks'
import {useMutation as useMutationBase} from 'graphql-hooks'
import {STATUS} from 'tidbits/utils/status'
import {useMutation} from './query'

jest.mock('graphql-hooks', () => ({
  useMutation: jest.fn()
}))

test('fails with missing query', () => {
  useMutationBase.mockImplementation(() => [
    async () => ({}),
    {}
  ])
  expect(() => {
    const {result} = renderHook(() => useMutation())
    const hook = result.current
  }).toThrow()
})

test('mutate value', async () => {
  useMutationBase.mockImplementation(() => [
    async () => ({}),
    {}
  ])
  const {result} = renderHook(
    () => useMutation('query{}')
  )
  const [mutate] = result.current
  await mutate()
})

test('mutate value with variable', async () => {
  useMutationBase.mockImplementation(() => [
    async () => ({}),
    {}
  ])
  const {result} = renderHook(
    () => useMutation('query{}', {variable: 'name'})
  )
  const [mutate] = result.current
  await mutate()
})

test('mutate value with onChange', async () => {
  useMutationBase.mockImplementation(() => [
    async value => {
      expect(value).toEqual('hello')
      return {}
    },
    {}
  ])
  let onChangeCalled = 0
  const {result} = renderHook(
    () => useMutation('query{}', {
      onChange: ({value, meta}) => {
        if (onChangeCalled == 0) {
          onChangeCalled++
          expect(value).toEqual('hello')
          expect(meta.status).toEqual(STATUS.loading)
        }
        else if (onChangeCalled == 1) {
          onChangeCalled++
          expect(meta.status).toEqual(STATUS.success)
        }
      }
    })
  )
  const [mutate] = result.current
  await mutate('hello')
  expect(onChangeCalled).toEqual(2)
})

test('mutate value with variable and onChange', async () => {
  useMutationBase.mockImplementation(() => [
    async value => {
      expect(value).toEqual({name: 'hello'})
      return {}
    },
    {}
  ])
  let onChangeCalled = 0
  const {result} = renderHook(
    () => useMutation('query{}', {
      variable: 'name',
      onChange: ({value, meta}) => {
        if (onChangeCalled == 0) {
          onChangeCalled++
          expect(value).toEqual('hello')
          expect(meta.status).toEqual(STATUS.loading)
        }
        else if (onChangeCalled == 1) {
          onChangeCalled++
          expect(meta.status).toEqual(STATUS.success)
        }
      }
    })
  )
  const [mutate] = result.current
  await mutate('hello')
  expect(onChangeCalled).toEqual(2)
})

test('errornous mutate value with onChange', async () => {
  useMutationBase.mockImplementation(() => [
    async value => {
      expect(value).toEqual({name: 'hello'})
      return {httpError: {body: 'error'}}
    },
    {}
  ])
  let onChangeCalled = 0
  const {result} = renderHook(
    () => useMutation('query{}', {
      variable: 'name',
      onChange: ({value, meta}) => {
        if (onChangeCalled == 0) {
          onChangeCalled++
        }
        else if (onChangeCalled == 1) {
          onChangeCalled++
          expect(meta.status).toEqual(STATUS.failure)
        }
      }
    })
  )
  const [mutate] = result.current
  await mutate('hello')
  expect(onChangeCalled).toEqual(2)
})
