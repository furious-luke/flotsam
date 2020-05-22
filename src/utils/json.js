import {isObject, isArray} from './primitives'
import {toCamelCase} from './string'

export function jsonToCamelCase(json) {
  if (isObject(json)) {
    let newJson = {}
    Object.keys(json).forEach(key => {
      newJson[toCamelCase(key)] = jsonToCamelCase(json[key])
    })
    return newJson
  } else if (isArray(json)) {
    return json.map(jsonToCamelCase)
  }
  return json
}

export function jsonStringToCamelCase(string) {
  return jsonToCamelCase(JSON.parse(string))
}
