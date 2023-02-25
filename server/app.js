import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, { cors: { origin: '*' } });

io.on("connection", (socket) => {
    // socket.broadcast.emit("chat","new user joiner");
    socket.on("chat",(payload)=>{
        socket.broadcast.emit("chat","new user joiner");
        io.emit("chat",payload);
        console.log("connected");
    })
});

server.listen(5000,()=>{
console.log("listen");
});