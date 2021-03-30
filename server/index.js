const express = require('express');
const cors = require('cors')
const app = express();
const httpServer = require('http').createServer(app);
const { createRoom } = require('./helper/rooms')

app.use(cors());

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const rooms = [];

app.post('/:roomName', (req, res) => {
  const { roomName } = req.params;
  const newRoom = createRoom(roomName)
  rooms.push(newRoom);
  res.send(newRoom);
})

io.on('connection', socket => {
  console.log('user connected');
  socket.on('test', () => {
    console.log('here');
  })
  socket.on('get rooms', () => {
    socket.emit('get rooms', rooms)
  })
})

httpServer.listen(5000, () => {
  console.log('listening to port 5000')
}
);