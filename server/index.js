const express = require("express");
const chatapp = express();
const http = require("http"); //to build server tpgether with socket .io
const {Server} = require("socket.io");


//middleware
const cors = require("cors"); //required for socket.io

chatapp.use(cors());

const server = http.createServer(chatapp);

//invoking Server method of socket.io and passing server created above in its parameter
const io = new Server(server,{
    cors: {
        origin: "https://chatty-chatters.netlify.app", //this will show that it is okay to accept url from this port
        methods: ["GET","POST"], //specify what type of request is allowed
    },
});

// means we are listening on an event with id = connection , if listening is successfull then perform some action using a callback function
io.on("connection", (socket)=> {
    console.log(`User connected : ${socket.id}`);

    //join the room that we sent(emit) from frontend
    socket.on("join_room",(data)=>{
        socket.join(data);//here the data is the room emittefd from the frontend
        console.log(`user with id: ${socket.id} joined the room : ${data}`);
    })

    socket.on("send_message", (data)=> {
        socket.to(data.room).emit("recieve_message",data) //sending data to a specing room by its id
    })

    socket.on("disconnect",()=> {
        console.log("User Disconnected: ", socket.id);
    });
}); 


server.listen(3001, () => {
    console.log("SERVER RUNNING...")
})
