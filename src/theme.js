import {createTheme, LightTheme, lightThemePrimitives} from 'baseui'

export const overrides = {
  colors: {
    primary: '#3079ff',
    header: '#4b4b4b',
    background: '#f9f9f9'
  },
  typography: {
    ...LightTheme.typography,
    menu: {
      ...LightTheme.typography.font400
    }
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
  }
}

const Theme = createTheme(lightThemePrimitives, overrides)

export default Theme
