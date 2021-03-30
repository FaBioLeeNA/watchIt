import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap'

const Main = styled.div`
  margin: 0 auto;
  width: fit-content;
`
const VideoStream = styled.video`
  border: 1px solid black;
  max-width:1080px;
  max-height:720px;
`

const App = () => {

  const videoRef = useRef();

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
    <>
      <Main>
        <h1>Stream</h1>
      </Main>
      <VideoStream
        autoPlay
        ref={videoRef}
      >
      </VideoStream>
      <Button onClick={startCapture} variant="primary">Start</Button>
      <Button onClick={stopCapture} variant="secondary">Stop</Button>


    </>
  );
};

export default App;
