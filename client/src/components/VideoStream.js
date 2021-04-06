import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { useSocket } from '../contexts/SocketProvider'
import { useRooms } from '../contexts/RoomsProvider';
import { Link, Redirect } from 'react-router-dom';
import { usePeer } from '../contexts/PeerProvider';

const Video = styled.video`
  border: 1px solid black;
  max-width:1080px;
  max-height:720px;
`


const VideoStream = ({ match }) => {
  const videoRef = useRef();
  const { socket } = useSocket();
  
  const { peer } = usePeer();
  const { rooms } = useRooms();
  const [ stream, setStream ] = useState(null)
  
  const roomData = rooms.find(room => `/rooms/${room.id}` === match.url);
  
  const userId = socket.id;
  
  useEffect(() => {
    
    console.log(peer);
    console.log(socket);
    // peer.on('open', id => {
    //   console.log('peer open')
    //   socket.emit('join room', roomData, userId);
    // })

    const getStream = id => {
      console.log('giving stream to', id);
      // if (stream) {
      //   const call = peer.call(id, stream);
      //   console.log(call)
      // }
    }

    socket.once('get stream', getStream);

    return () => {
      socket.off('get stream', getStream);
    }
    
  }, [socket, stream, roomData, userId]);

  if (!roomData) {
    return <Redirect to='/' />
  }

  const test = () => {
    console.log('here')
    socket.emit('test', roomData, userId);
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
      <Video
        autoPlay
        ref={videoRef}
      />
      
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
