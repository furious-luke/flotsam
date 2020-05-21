import {jsonStringToCamelCase} from './json'

describe('jsonStringToCamelCase', () => {
  it('works', () => {
    const json = jsonStringToCamelCase('{"hello_world":1}')
    expect(Object.keys(json)[0]).toEqual('helloWorld')
  })
})
