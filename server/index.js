const express = require('express');
const cors = require('cors')
const app = express();
const httpServer = require('http').createServer(app);
const { createRoom } = require('./helper/rooms');
const { disconnect } = require('process');

app.use(cors());
app.use(express.json())

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const rooms = [];
const users = {a:'a', b:'b', c: 'c'};

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
  

  //get all the rooms 
  socket.on('get rooms', () => {
    socket.emit('get rooms', rooms)
  })
  
  //creates a new room
  socket.on('create new room', (roomName, id) => {
    const newRoom = createRoom(roomName, id)
    rooms.push(newRoom);
    io.emit('add new room', newRoom);
  });

  //join a socket to a room
  socket.on('join room', (roomData, userId) => {
    const roomId = roomData.id
    socket.join(roomId);

    socket.on('test', (roomData, userId) => {
      socket.to(roomId).emit('hi');
      console.log(socket.rooms)
    })
    
    if (!(roomData.ownerId === userId)) {
      console.log(userId, 'join', roomId)
      socket.to(roomData.ownerId).emit('get stream', userId)
    }


    socket.on('leave room', () => {
      console.log(userId, 'left the room', roomData.id)
      socket.leave(roomId)
    })

    // socket.on('disconnect', () => {
    //   console.log(userId, 'disconnected from room', roomData.id)
    //   socket.leave(roomId)
    // })
  });


  socket.on('disconnect', () => {
    console.log('a user has disconnected')
  })
})

httpServer.listen(5000, () => {
  console.log('listening to port 5000')
}
);