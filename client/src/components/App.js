import React from 'react';
import styled from 'styled-components';
import VideoStream from './VideoStream';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Lobby from './Lobby';
import { SocketProvider } from '../contexts/SocketProvider';
import { RoomsProvider } from '../contexts/RoomsProvider';


const Main = styled.div`
  margin: 0 auto;
  width: fit-content;
`

const App = () => {

  return (
    <SocketProvider>
      <RoomsProvider>   
        <Router>
          <Main>
            <h1>Stream</h1>
          </Main>
          <Switch>
            <Route path="/" exact>
            <Lobby></Lobby>
            </Route>
            <Route path="/stream" exact> 
              <VideoStream></VideoStream>
            </Route>
          </Switch>
        </Router>
      </RoomsProvider>
    </SocketProvider>
  );
};

export default App;
