import React from 'react';
import theme from "../../../../styles/Themes/theme";
import tw from "tailwind-styled-components"
import styled from "styled-components"


const Regist = () => {
    return (
        <div>
            <TTT className ="flex items-center">
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
  color: #0070f3;
  background: #61dafb;
`


const HeadRegist = tw.div`
    ml-9
    hover:underline
`
const TTT = tw.div`
   flex
    items-center
    justify-center
    flex-col
    w-full
    bg-indigo-600
`
export default Regist;