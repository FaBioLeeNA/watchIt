import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Modal } from 'react-bootstrap';
import axios from 'axios'
import { useUser } from '../contexts/UserProvider';

const LoginModal = ({hideModal, setLoged }) => {
  const { userSetter } = useUser();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const loginCredentials = (id, pass, success, fail) => {
    axios({
      method: 'post',
      url: 'http://localhost:5000/login',
      data: {
        id,
        pass
      }
    }).then(data => success(data.data))
    .catch(err => fail(err));
  }

  const handleSubmit = e => {
    e.preventDefault();
    loginCredentials(usernameRef.current.value, 
      passwordRef.current.value, 
      (data) => {
        userSetter(data);
        setLoged(true);
        hideModal();
      },
      (err) => {
        alert('invalid credential')
      }
    )
  }

  return (
    <>
      <Modal.Header closeButton>Login</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder='username' ref={usernameRef}></Form.Control>
            <br/>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='password' ref={passwordRef}></Form.Control>
          </Form.Group>
          <Button type='submit'>Log in</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default LoginModal;
