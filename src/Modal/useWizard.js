import * as React from 'react'

export function useWizard({modals = []}) {
  const modalStates = modals.reduce(modalReducer, [])
  const initialIndex = modalStates.findIndex(({enabled}) => !!enabled)
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
  const currentModal = currentIndex != -1 ? modalStates[currentIndex].component : undefined
  function nextModal() {
    setCurrentIndex(currentIndex + 1)
  }
  return [currentModal, nextModal]
}

function modalReducer(modalStates = [], modal = {}) {
  const {hook, component} = modal
  const enabled = hook ? hook() : true
  return [
    ...modalStates,
    {
      enabled,
      component
    }
  ]
}
