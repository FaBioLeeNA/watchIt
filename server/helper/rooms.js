const {v4} = require('uuid');

module.exports = {
  createRoom: (roomName) => {
    const id = v4();
    const newRoomObj = {
      roomName,
      id,
      users: {}
    }
    return newRoomObj;
  } 
}