import styled from "styled-components";
import Nav from "./Nav";
import React from "react";

const Header = () => {

    return(
        <>
                <HeaderBox >
                        <Img src="/img/logo.png"></Img>
                        <h1 className="text-6xl" >Music Harmony</h1>

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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${props => props.theme.layoutColors.nav};
  border-bottom: 3px solid darkblue;

    font-family: 'Gamja Flower', cursive;
`
const FlexBox = styled.img`
    display: flex;
  
`

const Img = styled.img`
width: 10%;
`
export default Header;