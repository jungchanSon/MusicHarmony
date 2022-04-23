import '../../styles/globalStyles'
import {ThemeProvider} from "styled-components"
import GlobalStyle from "../../styles/globalStyles";
import tempTheme from "../../styles/Themes/theme";
import { Head } from "next/document"
import Nav from "../components/Layout/Nav";
import Header from "../components/Layout/Header";
import React from "react";
import Footer from "../components/Layout/Footer";

function MyApp({ Component, pageProps }) {
  return (
          <ThemeProvider theme={tempTheme}>
              <header>
                  <script src="https://cdn.tailwindcss.com"></script>
              </header>
              <Header>
                  <link rel="preconnect" href="https://fonts.googleapis.com"/>
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                  <link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet"/>
              </Header>


            {/*<GlobalStyle/>*/}
            <Component {...pageProps} />


              <Footer/>
          </ThemeProvider>
  )
}

export default MyApp
