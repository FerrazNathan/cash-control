import { createGlobalStyle } from "styled-components";

interface GlobalStyleProps {
  contrast: boolean
}


export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.contrast ? props.theme.contrast.dark : props.theme.background.medium};
    color: ${(props) => props.theme.text.light};
    -webkit-font-smoothing: antialiased;
    padding-bottom: 2rem;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }

  .Toastify__toast {
    font-family: 'Roboto', sans-serif;
    border-radius: 8px;
  }

  .Toastify__toast--success {
    background: ${props => props.theme.toast.success};
    color: ${props => props.theme.text.light};
  }

  .Toastify__toast--error {
    background: ${props => props.theme.toast.error};
    color: ${props => props.theme.text.light};
  }
`