import React from 'react';
import theme from "../../../../styles/Themes/theme";
import tw from "tailwind-styled-components"
import styled from "styled-components"


const Regist = () => {
    return (
        <div>
            <TTT className ="flex items-center grey">
                <h1>Regist</h1>
                <HeadRegist>aaa</HeadRegist>
                <Test>ASDASD</Test>
            </TTT>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </div>
    );
};

const Test = styled.div`
  color: ${theme.blue};
  background: ${theme.blue};
`


const HeadRegist = tw.div`
    ml-9
    hover:underline
`
const TTT = tw.div`
    blue
   flex
    items-center
    justify-center
    flex-col
    w-full
    bg-lime-900
`
export default Regist;