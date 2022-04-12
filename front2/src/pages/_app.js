import '../../styles/globals'
import {Themeprovider} from "styled-component"
import GlobalStyle from "../../styles/globals";
import tempTheme from "../../styles/Themes/theme";


function MyApp({ Component, pageProps }) {
  return (
      <Themeprovider theme={tempTheme}>
        <GlobalStyle/>
        <Component {...pageProps} />
      </Themeprovider>
  )
}

export default MyApp
