import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { useSocket } from '../contexts/SocketProvider'
import { useRooms } from '../contexts/RoomsProvider';
import { Link } from 'react-router-dom';
import Peer from 'peerjs';

const Video = styled.video`
  border: 1px solid black;
  max-width:1080px;
  max-height:720px;
`


const VideoStream = ({ match }) => {
  const videoRef = useRef();
  const { socket } = useSocket();
  const { rooms } = useRooms();
  const [ stream, setStream ] = useState(null)
  
  const roomData = rooms.find(room => `/rooms/${room.id}` === match.url);
  let userId;
  let peer;

  if (socket) {
    userId = socket.id;
    peer = new Peer(userId, {
      host: '/',
      port: `5001`
    }); 

    peer.on('open', id => {
      socket.emit('join room', roomData, id);
    })

    
  } else {
    window.location = '/'
  }
  
  const test = () => {
    socket.emit('test', roomData, userId);
    console.log(stream)
  }

  

  const startCapture = async () => {

    const displayMediaOptions = {
      video: {
        frameRate: 120
      },
      audio: true
    }

    try {
      let captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      setStream(captureStream);
      videoRef.current.srcObject = captureStream;
      // socket.on('get stream', id => {
      //   console.log('get stream')
      //   const call = peer.call(id, captureStream);
      //   console.log(call)
        // call.on('stream', stream => {
        //   videoRef.current.srcObject = stream;
        // })
      // })
    } catch(err) {
      console.error("Error " + err);
    }
  }

  
  const stopCapture = (e) => {
    let srcObject = videoRef.current.srcObject;

    if (srcObject) {
      srcObject.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    videoRef.current.srcObject = null;
  }

  return (
    <div>
      {stream &&
      <Video
        autoPlay
        ref={videoRef}
      />
      }
      {(userId === roomData.ownerId) ? 
        <>
          <Button onClick={startCapture} variant="primary">Start</Button>
          <Button onClick={stopCapture} variant="secondary">Stop</Button>
        </> :
        <></>
      }
      <Button onClick={test} variant="info">Test</Button>
      <Button  variant="primary">
        <Link onClick={() => {
          socket.emit('leave room');
          stopCapture();
        }
        } style={{color: 'white', textDecoration: 'none'}} to='/'>Back</Link>
      </Button>

    </div>
  );
}

export default VideoStream;
