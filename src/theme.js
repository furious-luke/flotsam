import {createTheme, lightThemePrimitives} from 'baseui'

export const tidbitsThemePrimitives = {
  ...lightThemePrimitives,
  primaryA: '#3079ff',
  primaryB: '#f9f9f9'
}
    

export const tidbitsThemeOverrides = {
  colors: {
    background: '#f9f9f9',
    separator: '#2c3e50'
  },
  // typography: {
  //   ...LightTheme.typography,
  //   menu: {
  //     ...LightTheme.typography.font400
  //   }
  // },
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

const TidbitsTheme = createTheme(tidbitsThemePrimitives, tidbitsThemeOverrides)

export default TidbitsTheme
