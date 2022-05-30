import styled from "styled-components";

const Footer = () => {
    return(
        <>
            <FootContainer className={"px-10"}>
                <FlexContainer>
                    <h1 className={"text-5xl"}>전남대학교</h1>
                        <NameList>

                        </NameList>
                    <h1></h1>
                </FlexContainer>
            </FootContainer>
        </>
    );
}
const FootContainer = styled.div`
  background: ${props => props.theme.layoutColors.sub};
  height: 100%;
`
const FlexContainer = styled.div`
  display: flex;
  display:flex;
  align-items: center;
  justify-content: space-between;
`
const NameList = styled.ul`

`
export default Footer;