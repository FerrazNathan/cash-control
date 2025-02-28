/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components'
// import { defaultTheme } from '../styles/themes/themeDefault'
import { lightTheme } from '../styles/themes/lightTheme'

type ThemeType = typeof lightTheme


declare module 'styled-components' {
   
  export interface DefaultTheme extends ThemeType {}
}