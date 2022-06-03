import styled from "styled-components";
import {GetRooms} from "../api/roomAPI";
import {RoomStore} from "../../store/RoomStore";
import axios from "axios";
import {type} from "os";

const index = () => {
    var param = new URLSearchParams();
    const LocalURL = "http://15.165.82.230:8080"
    let id;
    const {roomList} = RoomStore();

    axios.get(LocalURL+"/getRooms").then((e)=> {
        id = e.data[0].roomId;
        console.log(id);
        console.log(typeof "dbs")
        param.append("roomId", id)
        param.append("userId", "유저id")
        console.log(param)
        axios.post(LocalURL + "/adduser",param).then(()=>{
            console.log("        axios.post(LocalURL + \"/adduser\",param).then(()=>{\n")
            axios.get(LocalURL+"/getUsers/"+id).then((e) =>{
                console.log(e.data);
            })
        });
    });




    return(
        <>
            testPage
        </>
    );
}

export default index;