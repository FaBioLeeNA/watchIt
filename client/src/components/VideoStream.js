import React, { useRef } from 'react';
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { useSocket } from '../contexts/SocketProvider'
import { useRooms } from '../contexts/RoomsProvider';
import { Link, Redirect } from 'react-router-dom';

const Video = styled.video`
  border: 1px solid black;
  max-width:1080px;
  max-height:720px;
`

const VideoStream = ({ match }) => {
  const videoRef = useRef();
  const { socket } = useSocket();
  const { rooms } = useRooms();


  let userId;

  if (socket) {
    userId = socket.id
  } else {
    return (<Redirect to='/' />)
  }

  const roomData = rooms.find(room => `/rooms/${room.id}` === match.url);
  console.log(roomData.ownerId, userId);

  const test = () => {
    socket.emit('test')
    console.log()
  }

  const startCapture = async () => {

    let captureStream = null;
    const displayMediaOptions = {
      video: {
        frameRate: 120
      },
      audio: true
    }

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      videoRef.current.srcObject = captureStream;
    } catch(err) {
      console.error("Error " + err);
    }
    
  }

  const stopCapture = (e) => {
    let srcObject = videoRef.current.srcObject;

    if (srcObject) {
      srcObject.getTracks().forEach(track => track.stop());
    }

    videoRef.current.srcObject = null;
  }

  return (
    <div>
      <Video
        autoPlay
        ref={videoRef}
      >
      </Video>
      {(userId === roomData.ownerId) ? 
        <>
          <Button onClick={startCapture} variant="primary">Start</Button>
          <Button onClick={stopCapture} variant="secondary">Stop</Button>
        </> :
        <></>
      }
      <Button onClick={test} variant="info">Test</Button>
      <Button variant="primary">
        <Link style={{color: 'white', textDecoration: 'none'}} to='/'>Back</Link>
      </Button>

    </div>
  );
}

export default VideoStream;
