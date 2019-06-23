import {createTheme, LightTheme, lightThemePrimitives} from 'baseui'

const Theme = createTheme(
  {
    ...lightThemePrimitives,
    primaryFontFamily: "'Raleway', sans-serif"
  },
  {
    colors: {
      primary: '#3079ff',
      header: '#4b4b4b',
      background: '#f9f9f9'
    },
    typography: {
      lightFont500: {
        ...LightTheme.typography.font500,
        fontWeight: 'normal'
      },
      sublanding: {
        ...LightTheme.typography.font700,
        fontFamily: "'Fredoka One', cursive"
      }
    }
  }
)

export default Theme
