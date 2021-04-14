import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { useSocket } from '../contexts/SocketProvider'
import { useRooms } from '../contexts/RoomsProvider';
import { Link, Redirect } from 'react-router-dom';
import { usePeer } from '../contexts/PeerProvider';
import ChatBox from './ChatBox';

const Video = styled.video`
  border: 1px solid black;
  min-height:50vh;
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
    
  }, [socket, stream, roomData, userId, peer]);

  if (!roomData) {
    return <Redirect to='/' />
  }

  const test = () => {
    console.log(socket)
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
    <div className='d-flex' style={{height: '100vh'}}>
      <div className='d-flex flex-column flex-grow-1'>
        <Video
          autoPlay
          ref={videoRef}
          />
        <div>
          {(userId === roomData.ownerId) ? 
            <>
              <Button onClick={startCapture} variant="primary">Start</Button>
              <Button onClick={stopCapture} variant="secondary">Stop</Button>
            </> :
            <></>
          }
          <Button onClick={test} variant="info">Test</Button>
          <Button variant="primary">
            <Link onClick={() => {
              socket.emit('leave room');
              stopCapture();
            }
          } style={{color: 'white', textDecoration: 'none'}} to='/'>Back</Link>
        </Button>
        </div>
      </div>
      <ChatBox />

    </div>
  );
}

export default VideoStream;
