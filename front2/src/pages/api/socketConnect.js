import Sockjs from "sockjs-client";
import Stomp from "stompjs";

// 소켓
const connnect = (stompClient) => {
    var socket = new Sockjs('http://13.124.142.7:8080/music-harmony');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/toto', function (data) {
            console.log(data);
        });
    });
    console.log("Connnnect")
}
export default connnect;