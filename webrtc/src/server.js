import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname +"/src/views")

const handleListen = () => console.log("http://localhost:3000");
app.listen(3000, handleListen);