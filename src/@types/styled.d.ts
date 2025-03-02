/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components'

type ThemeType = {
  white: string
  primary: {
    standard: string
    light: string
    medium: string
  }
  background: {
    standard: string
    light: string
    medium: string
  }
  text: {
    standard: string
    light: string
    medium: string
  }
  surface: {
    standard: string
    light: string
    medium: string
  }
  success: {
    standard: string
    light: string
    medium: string
  }
  error: {
    standard: string
    light: string
    medium: string
  }
  toast: {
    success: string
    error: string
  }
  contrast: {
    standard: string
    highlight: string
    dark: string
  }
  breakpoints: {
    mobile: string
    tablet: string
    desktop: string
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}