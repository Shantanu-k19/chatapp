const express=require('express');
var http =require("http");

const app=express();
const port=process.env.PORT||5001;

var server=http.createServer(app);
var io=require("socket.io")(server,{

   
});


app.use(express.json());

var user_socket={};


io.on("connection",(socket)=>{
console.log("connected");

console.log(socket.id);
socket.on("/signin",(id)=>{
    console.log(id);
    user_socket[id]=socket;
    console.log(user_socket);
});

socket.on('signout',(id)=>{
delete user_socket[id];
console.log(user_socket);
socket.disconnect();
});

socket.on("message",(msg)=>{
    console.log(msg);
   
    targetId=msg.targetId
    console.log(user_socket[targetId] +"found");
    if(user_socket[targetId]){
        user_socket[targetId].emit("message",msg);
        
    }
})

});

server.listen(port,"0.0.0.0",()=>{
console.log("server started");
});