import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client'

const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {

  const socket = io('http://localhost:5000');
  
  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
}

