import React, { useRef } from 'react';
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { useSocket } from '../contexts/SocketProvider'

const Video = styled.video`
  border: 1px solid black;
  max-width:1080px;
  max-height:720px;
`

const VideoStream = () => {
  const videoRef = useRef();
  const socket = useSocket();

  const test = () => {
    socket.emit('test')
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
    let tracks = videoRef.current.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
  }

  return (
    <div>
       <Video
        autoPlay
        ref={videoRef}
      >
      </Video>
      <Button onClick={startCapture} variant="primary">Start</Button>
      <Button onClick={stopCapture} variant="secondary">Stop</Button>
      <Button onClick={test} variant="secondary">Test</Button>


    </div>
  );
}

export default VideoStream;
