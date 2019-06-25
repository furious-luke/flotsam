import React from 'react'
import {styled} from 'baseui'

export const Braille = styled('div', {
  ':after': {
    content: "'\\2807'",
    fontSize: '1.5em',
  },
  paddingTop: '.25em'
})
