const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("createRoom", (callback) => {
    const roomcode = generateroomcode();
    const room = {
      code: roomcode,
      creator: socket.id,
      users: [],
      gameStarted: false,
    };
    rooms.set(roomcode, room);

    socket.join(roomcode);
    socket.emit("roomCreated", roomcode);

    callback(socket.id === room.creator, roomcode);
    console.log(`Room created: ${roomcode}`);
  });

  // Modify the server code to emit the updated users list to all clients
  socket.on("joinRoom", (roomcode, username) => {
    const room = rooms.get(roomcode);
    if (room) {
      socket.join(roomcode);
      room.users.push({ id: socket.id, username });
      socket.emit("joinRoomResponse", "joined");

      // Emit the "userJoined" event to all clients in the room
      io.sockets.emit("userJoined", {
        username,
        userId: socket.id,
        users: room.users,
      });
      console.log(`${username} joined room ${roomcode}`);
      console.log(`Emitted 'userJoined' event to room ${roomcode}`);
    } else {
      socket.emit("joinRoomResponse", "failed");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    rooms.forEach((room, roomcode) => {
      const index = room.users.findIndex((user) => user.id === socket.id);
      if (index !== -1) {
        const username = room.users[index].username;
        room.users.splice(index, 1);
        io.sockets.emit("userLeft", {
          username,
          userId: socket.id,
          users: room.users,
        });
        console.log(`${username} left room ${roomcode}`);
      }
    });
  });

  socket.on("startGame", (roomcode) => {
    const room = rooms.get(roomcode);
    console.log("LIstening from client: start game");
    if (room) {
      room.gameStarted = true;
      console.log("working to start game");
      io.sockets.emit("gameStarted");
      console.log(`Game started in room ${roomcode}`);
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function generateroomcode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
