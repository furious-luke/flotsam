import {createTheme as createBaseTheme, lightThemePrimitives} from 'baseui'

import {deref} from './utils/primitives'

export const tidbitsThemePrimitives = {
  ...lightThemePrimitives
  // primaryA: '#3079ff',
  // primaryB: '#f9f9f9'
}
    

export const tidbitsThemeOverrides = {
  colors: {
    background: '#f9f9f9',
    separator: '#2c3e50'
  },
  layout: {
    content: {
      width: '61rem',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    primaryContent: {
      width: '40rem'
    },
    secondaryContent: {
      width: '20rem'
    }
  },
  sizing: {
    separation: '1rem'
  }
}

function createTheme(primitives, overrides) {
  const BaseTheme = createBaseTheme(primitives, overrides)
  return {
    ...BaseTheme,
    colors: {
      ...BaseTheme.colors,
      header: deref(overrides, 'colors.header', deref(BaseTheme, 'colors.background'))
    }
  }
}

const TidbitsTheme = createTheme(tidbitsThemePrimitives, tidbitsThemeOverrides)

export default TidbitsTheme
