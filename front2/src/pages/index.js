import React, {useEffect, useState} from 'react';
import io from "socket.io-client";
import Head from "next/head"
import styled from "styled-components";
let socket

const MainPage = () => {

    return (
        <div className="flex flex-col justify-center content-center">
            <Session >
                <div >
                    뮤직 하모니는 누구나 쉽게 이용할 수 있는 온라인 음악 협업 플랫폼입니다!
                </div>
                <Img src="/img/mainImg1.png">
                </Img>
            </Session>

            <Line className={"text-xs"}></Line>

            <Session>
                <div>
                    1. 가지고 있는 오디오 인터페이스에 악기를 연결 후, 컴퓨터와 연결해주세요.
                </div>
                <Img src="/img/firstStep.jpg"></Img>
            </Session>

            <Session className="mt-20">
                <Img src="/img/secondStep.jpg"></Img>

                <div>
                    2. 방을 만들거나 다른 사람의 방에 입장해 주세요.
                </div>
            </Session>

            <Session className="mt-20">
                <div>
                    3. 이제 다른 사람들과 합주를 진행하실 수 있습니다.
                </div>

                <Img src="/img/thirdStep.jpg"></Img>


            </Session>
        </div>
    );
};

const Session = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  
  padding: 50px 30px;
  font-weight: bold;
  font-size: 30px;
  font-family: 'Gamja Flower', cursive;
  font-family: 'Nanum Gothic', sans-serif;  
  line-height: 150%;
`

const Img = styled.img`
  width: 80%;
`

const Line = styled.div`
  
  border-top: 2px solid darkslategray;
`
export default MainPage;