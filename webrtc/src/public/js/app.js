const socket = new WebSocket(`ws://${window.location.host}`);
socket.addEventListener("open", ()=> {
    console.log("Connec");
});
socket.addEventListener("message",(msg) => {
    console.log("New Msg: ", msg);
});
socket.addEventListener("close", () => {
    console.log("discon");
});
setTimeout(() => {
    socket.send("hello device");
}, 1000);


const myFace = document.getElementById("myFace");

let myStream;

async function getMedia() {
    try {
        mySteam = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        });
        console.log(myStream);
    } catch(e) {
        console.log(e)
    }
}

getMedia();