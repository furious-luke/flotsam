import {jsonStringToCamelCase} from './json'

describe('jsonStringToCamelCase', () => {
  it('works for objects', () => {
    const json = jsonStringToCamelCase('{"hello_world":1}')
    expect(Object.keys(json)[0]).toEqual('helloWorld')
  })

  it('works for arrays', () => {
    const json = jsonStringToCamelCase('[{"hello_world":1}]')
    expect(Object.keys(json[0])[0]).toEqual('helloWorld')
  })
})
