export function filterKey(object, filter, key = 'label') {
  return filter ? object[key].toLowerCase().indexOf(filter.toLowerCase()) != -1 : true
}

export function filterObjects(objects = [], objectsToFilter = [], key = 'id') {
  const filterSet = new Set(objectsToFilter.map(o => o[key]))
  return objects.filter((a, b) => !filterSet.has(a[key]))
}
