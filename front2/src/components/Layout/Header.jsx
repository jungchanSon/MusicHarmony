import styled from "styled-components";
import Nav from "./Nav";
import React from "react";

const Header = () => {

    return(
        <>
                <HeaderBox className={"pt-4"}>
                    <h1 className={"text-5xl"} >Music Harmony</h1>
                    <h1></h1>
                    <Nav/>
                </HeaderBox>
        </>
    );
}
// const Container = styled.div`
//     background: ${props => props.theme.layoutColors.nav};
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `
const HeaderBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20vh;
  background: ${props => props.theme.layoutColors.nav};

    font-family: 'Gamja Flower', cursive;
`
const LogoBox = styled.img`
  width: 30%;
    height: min-content;
`
export default Header;