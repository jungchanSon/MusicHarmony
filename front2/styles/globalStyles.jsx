import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"


const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
  {  

  }
  
`

export default GlobalStyle
