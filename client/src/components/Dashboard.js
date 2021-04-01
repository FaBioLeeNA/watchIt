import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RoomsProvider } from '../contexts/RoomsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import styled from 'styled-components'
import Lobby from './Lobby';
import VideoStream from './VideoStream';

const Main = styled.div`
  margin: 0 auto;
  width: fit-content;
`

const Dashboard = () => {
  return (
    <SocketProvider>
      <RoomsProvider>   
        <Router>
          <Switch>
            <Route path="/" exact>
              <Main>
                  <h1>Lobby</h1>
              </Main>
              <Lobby />
            </Route> 
            <Route path="/rooms/:stream" component={VideoStream} /> 
          </Switch>
        </Router>
      </RoomsProvider>
    </SocketProvider>
  );
}

export default Dashboard;
