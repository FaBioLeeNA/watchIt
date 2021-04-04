import React, { useContext, useEffect, useState } from 'react';
import Peer from 'peerjs';
import { useSocket } from './SocketProvider';


const PeerContext = React.createContext();

export const usePeer = () => {
  return useContext(PeerContext);
}

export const PeerProvider = ({ children }) => {
  const [peer, setPeer] = useState(null);
  const { socket } = useSocket();

  useEffect(() => {
    const newPeer = new Peer(socket.id, {
      host: '/',
      port: `5001`
    });
    setPeer(newPeer)
    return () => {
      newPeer.destroy();
    };
  }, [socket]);

  return (
    <PeerContext.Provider value={{peer}} >
      {children}
    </PeerContext.Provider>
  );
}

