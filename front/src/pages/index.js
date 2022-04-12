import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import reportWebVitals from '../reportWebVitals';
import {DevSupport} from "@react-buddy/ide-toolbox";    //intellij 아니면 이부분 지우기
import {ComponentPreviews, useInitial} from "../dev";    //intellij 아니면 이부분 지우기

ReactDOM.render(
    <React.StrictMode>
        <DevSupport                                     //intellij 아니면 이부분 지우기
            ComponentPreviews={ComponentPreviews}   //intellij 아니면 이부분 지우기
            useInitialHook={useInitial}             //intellij 아니면 이부분 지우기
        >                                               //intellij 아니면 이부분 지우기
            <App/>
        </DevSupport>                               //intellij 아니면 이부분 지우기
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
