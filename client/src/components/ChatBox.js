import React, { useEffect, useRef } from 'react';
import { InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useSocket } from '../contexts/SocketProvider'

const ChatBox = () => {
  const messagesRef = useRef();
  const textRef = useRef();
  const { socket } = useSocket();

  useEffect(() => {
    const receiveMessage = (msg, user) => {

    }
    socket.on('receive message', receiveMessage); 
    return () => {
      socket.off('receive message', receiveMessage);
    }
  }, [socket])

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = textRef.current.value;
    // socket.emit('send message', msg, userId);
    textRef.current.value = '';
  } 

  return (
    <div className="d-flex flex-column flex-grow-1 border border-dark">
      <div className="flex-grow-1 overflow-auto"></div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control ref={textRef}></Form.Control>
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>

    </div>
  );
}

export default ChatBox;
