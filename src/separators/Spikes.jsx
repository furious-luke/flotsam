import * as React from 'react'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'

import {deref} from '../utils/primitives'

export function Spikes({
  top,
  bottom,
  color,
  children,
  ...props
}) {
  const [css, theme] = useStyletron()
  const _color = deref(theme, ['colors', color], color)
  const spikeCss = {
    content: "''",
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 10,
    display: 'block',
    height: '69px',
    backgroundSize: '69px 100%',
    backgroundPosition: '0%'
  }
  const className = css({
    // marginTop: '35px',
    // marginBottom: '35px',
    position: 'relative',
    background: _color,
    ':before': !!top ? {
      ...spikeCss,
      top: '-69px',
      backgroundImage: `linear-gradient(-45deg, ${_color} 25%, transparent 25%), linear-gradient(45deg, ${_color} 25%, transparent 25%)`,
      backgroundPosition: '34px'
    } : {},
    ':after': !!bottom ? {
      ...spikeCss,
      top: '100%',
      backgroundImage: `linear-gradient(135deg, ${_color} 25%, transparent 25%), linear-gradient(225deg, ${_color} 25%, transparent 25%)`
    } : {}
  })
  return <Block className={className} {...props}>{children}</Block>
}
