const {v4} = require('uuid');

module.exports = {
  createRoom: (roomName, ownerId) => {
    const id = v4();
    const newRoomObj = {
      ownerId,
      roomName,
      id,
      users: {}
    }
    return newRoomObj;
  } 
}