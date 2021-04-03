import React, { useContext, useEffect, useState } from 'react';
import { useSocket } from './SocketProvider';

const RoomsContext = React.createContext();



export const useRooms = () => {
  return useContext(RoomsContext);
}

export const RoomsProvider = ({ children }) => {

  const { socket } = useSocket()
  const [rooms, setRooms] = useState([]);
  const addRoom = (newRoom) => {
    setRooms(prevRooms => {
      return [...prevRooms, newRoom]
    })
  }
  
  useEffect(() => {
    if (socket) {
      socket.emit('get rooms');
      socket.on('get rooms', data => {
        setRooms(data);
      })
      socket.on('add new room', newRoom => {
        addRoom(newRoom);
        console.log(newRoom);
      })

      //socket event listeners

      if (socket) {
        socket.on('hi', () => {
          console.log('hi')
        })
      }
      
    }
  }, [socket]);


  return (
    <RoomsContext.Provider value={{rooms, addRoom}}>
      {children}
    </RoomsContext.Provider>
  );
}

