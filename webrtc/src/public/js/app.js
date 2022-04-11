// const socket = new WebSocket(`ws://${window.location.host}`);
// socket.addEventListener("open", ()=> {
//     console.log("Connec");
// });
// socket.addEventListener("message",(msg) => {
//     console.log("New Msg: ", msg);
// });
// socket.addEventListener("close", () => {
//     console.log("discon");
// });
// setTimeout(() => {
//     socket.send("hello device");
// }, 1000);
const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

const welcome = document.getElementById("welcome");
const call = document.getElementById("call");

call.hidden=true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;

async function getCameras() {
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        cameras.forEach(camera => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            camerasSelect.appendChild(option);
        })
    }catch (e) {console.log(e)}
}

async function getMedia() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        });
        myFace.srcObject = myStream;
        await getCameras();
    } catch(e) {
        console.log(e)
    }
}

const handleMuteBtn = () => {
    myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled))
    if(!muted) {
        muteBtn.innderText = "Unmute";
    } else {
        muteBtn.innerText = "Mute";
    }
}
const handleCameraBtn = () => {
    myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled ))
    if(cameraOff) {
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    } else{
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }
}

muteBtn.addEventListener("click", handleMuteBtn);
cameraBtn.addEventListener("click", handleCameraBtn);

const welcomeForm = welcome.querySelector("form");

startMedia = () => {
    welcome.hidden = true;
    call.hidden = false;
    getMedia();
};

const handleWelcomesubmit = (event) => {
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    socket.emit("join_room", input.value, startMedia());
    input.value="";
}

welcomeForm.addEventListener("submit", handleWelcomesubmit)

socket.on("welcome", () =>{
    console.log("someone joined");
})