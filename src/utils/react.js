import React from 'react'
import ReactDOM from 'react-dom'

export function mount(component) {
  const element = document.createElement('div')
  element.setAttribute('id', 'main-mount')
  document.body.appendChild(element)
  ReactDOM.render(component, element)
}
