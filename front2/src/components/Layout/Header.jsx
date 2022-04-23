import styled , {css}from "styled-components";

const Header = () => {

    return(
        <>
            <HeaderBox>
                <LogoBox src="img/header.png" />
                <h1 className={"text-5xl"} >Music Harmony</h1>
                <h1></h1>
            </HeaderBox>
        </>
    );
}

const HeaderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw; 
    height: 20vh;
    background: ${props => props.theme.layoutColors.nav};
    font-family: 'Gamja Flower', cursive;
`
const LogoBox = styled.img`
    width: 20%;
    height: 100%;
`
export default Header;