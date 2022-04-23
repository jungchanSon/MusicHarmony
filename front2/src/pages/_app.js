import '../../styles/globalStyles'
import styled, {ThemeProvider} from "styled-components"
import GlobalStyle from "../../styles/globalStyles";
import tempTheme from "../../styles/Themes/theme";
import Nav from "../components/Layout/Nav";
import Header from "../components/Layout/Header";
import React from "react";
import Footer from "../components/Layout/Footer";

function MyApp({ Component, pageProps }) {
  return (
          <ThemeProvider theme={tempTheme}>
              <header>
                  {/*<link rel="preconnect" href="https://cdn.tailwindcss.com"/>*/}
                  <script src="https://cdn.tailwindcss.com" />
                  <link rel="preconnect" href="https://fonts.googleapis.com"/>
                  <link rel="preconnect" href="https://fonts.gstatic.com"/>
                  <link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet"/>
              </header>

              <Header />
            {/*<GlobalStyle/>*/}
            <ComponentContainer className = {"px-10"}>
                <Component {...pageProps} />
            </ComponentContainer>
              <Footer/>
          </ThemeProvider>
  )
}

const ComponentContainer = styled.div`
    background: ${(props) => props.theme.layoutColors.main};

`
export default MyApp
