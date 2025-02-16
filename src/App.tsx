import React from "react"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/themeDefault"
import { GlobalStyle } from "./styles/global"

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <React.Fragment>
        Hello World
      </React.Fragment>
    </ThemeProvider>
  )
}
