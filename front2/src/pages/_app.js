import '../../styles/globalStyles'
import {ThemeProvider} from "styled-components"
import GlobalStyle from "../../styles/globalStyles";
import tempTheme from "../../styles/Themes/theme";
import { Head } from "next/document"

function MyApp({ Component, pageProps }) {
  return (
          <ThemeProvider theme={tempTheme}>
            <GlobalStyle/>
              <script src="https://cdn.tailwindcss.com"></script>

            <Component {...pageProps} />
          </ThemeProvider>
  )
}

export default MyApp
