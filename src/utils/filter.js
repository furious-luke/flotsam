export function filterKey(object, filter, key = 'label') {
  return filter ? object[key].toLowerCase().indexOf(filter.toLowerCase()) != -1 : true
}
