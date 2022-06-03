import styled, {css} from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import VideoBox from "./VideoBox";

const VideoRayoutContainer = ({l, streamArray, myStream}) => {
    console.log("llllll", l)
    return (
        <>
            <RayoutContainer l={l} w={20}>
                <VideoBox  stream={myStream} autoPlay></VideoBox>
                {
                    streamArray.map((item, key) => (
                        <VideoBox key={key} stream={item.stream} />
                    ))
                }
            </RayoutContainer>
        </>
    );
};

const RayoutContainer = styled.div`
    display: grid;
    row-gap: 20px;
    column-gap: 20px;
    ${(props) => {
        if(props.l == 0)
          return css`grid-template-columns: 80vw`
        else if(props.l == 1)
          return css`grid-template-columns: 40vw 40vw`
        else if(props.l == 2)
          return css`grid-template-columns: 30vw 30vw 30vw`
        else if(props.l == 3)
          return css`grid-template-columns: 40vw 40vw`
        else if(props.l == 4)
          return css`grid-template-columns: 25vw 25vw 25vw`
    }
}
`
export default VideoRayoutContainer;