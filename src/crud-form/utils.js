import {OPERATION} from './constants'

export function getCrudOptions(operation, submitLabel) {
  const verb = {
    [OPERATION.create]: 'Create',
    [OPERATION.update]: 'Update',
    [OPERATION.delete]: 'Delete'
  }[operation]
  let submitColor
  if (operation == OPERATION.delete) {
    submitColor = 'negative'
    if (!submitLabel) {
      submitLabel = 'Delete'
    }
  }
  else {
    if (!submitLabel) {
      submitLabel = 'Save'
    }
  }
  return {
    verb,
    submitColor,
    submitLabel
  }
}
