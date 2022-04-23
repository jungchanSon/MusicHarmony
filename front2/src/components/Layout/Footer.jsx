import styled from "styled-components";

const Footer = () => {
    return(
        <>
            <FootContainer className={"px-10"}>
                <FlexContainer>
                    <h1 className={"text-5xl"}>전남대학교</h1>
                        <NameList>
                            <h3 >김지민</h3>
                            <h3 >류한일</h3>
                            <h3 >손정찬</h3>
                            <h3 >고범수</h3>
                            <h3 >김명지</h3>
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