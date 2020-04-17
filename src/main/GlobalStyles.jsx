import React, {useEffect} from 'react'
import {useStyletron} from 'baseui'

export function GlobalStyles({children}) {
  const [_, theme] = useStyletron()
  useEffect(() => {
    const globalCss = `
      html, body {
        margin: 0;
        background: ${theme.colors.background};
      }
    `
    injectStyle(globalCss)
  }, [])
  return children
}

function injectStyle(css) {
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  head.appendChild(style)
  style.type = 'text/css'
  if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
}
