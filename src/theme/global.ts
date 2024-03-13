import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    scrollbar-color: rgb(239, 129, 25,0.8);
    ::-webkit-scrollbar {
      width: 9px;
      height: 9px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: rgb(239, 129, 25,0.8);
    }
    ::-webkit-scrollbar-corner {
      background: none;
    }
    outline-color: rgba(255, 255, 255, 0.2);
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }


  body {
    background: ${(props) => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.colors.text};

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active,
    input:-internal-autofill-selected {
      -webkit-box-shadow: 0 0 0 30px ${(props) => props.theme.colors.darkBlue} inset !important;
      -webkit-text-fill-color: ${(props) => props.theme.colors.lightText} !important;
    }
  }

  body, input, button {
    font-family: 'Visby', Arial, Helvetica, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colors.text};
    font-family: 'Visby';
    font-weight: 500;
  }

  button {
    color: ${(props) => props.theme.colors.text};
  }

  textarea {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};

    :focus {
      outline: ${(props) => props.theme.colors.primary} auto 0.0625rem;
    }
  }

  ul {
    list-style-type: none;
  }

  html, body, #root {
    height: 100svh;
  }

  span, td, th {
    font-size: 0.875rem;
    line-height: 1.43;
  }

  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.17rem;
  }
  
  h4 {
    font-size: 1rem;
  }
  
  h5 {
    font-size: 0.83rem;
  }
  
  h6 {
    font-size: 0.67rem;
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Toastify__toast-body {
    div {
      font-size: 0.75rem;
      font-weight: bold;
    }
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;
