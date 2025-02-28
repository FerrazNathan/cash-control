import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.success.light};
  }

  body {
    background: ${(props) => props.theme.background.medium};
    color: ${(props) => props.theme.text.light};
    -webkit-font-smoothing: antialiased;
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