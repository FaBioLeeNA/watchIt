const express = require('express');
const cors = require('cors')
const app = express();
const httpServer = require('http').createServer(app);
const { createRoom } = require('./helper/rooms')

app.use(cors());
app.use(express.json())

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const rooms = [];
const users = {};

// app.post('/rooms/:roomName', (req, res) => {
//   const { roomName } = req.params;
//   const newRoom = createRoom(roomName)
//   rooms.push(newRoom);
//   io.emit('add new room', newRoom);
//   res.send(newRoom);
// });

app.post('/login', (req, res) => {
  const { id, pass } = req.body; 
  const valid = users[id] === pass
  if (valid) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
})

app.post('/signup', (req, res) => {
  const { id, pass } = req.body;
  if (id && pass) {
    if (!users[id]) {
      users[id] = pass;
      console.log(users);
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(403)
  }
})

io.on('connection', socket => {
  console.log('user connected');
  socket.on('test', () => {
    console.log('here');
  })

  socket.on('get rooms', () => {
    socket.emit('get rooms', rooms)
  })
  
  socket.on('create new room', (roomName, id) => {
    const newRoom = createRoom(roomName, id)
    rooms.push(newRoom);
    socket.join(newRoom.id);

    io.emit('add new room', newRoom);
  })
})

httpServer.listen(5000, () => {
  console.log('listening to port 5000')
}
);