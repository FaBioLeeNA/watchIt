import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Modal } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const SignUpModal = ({hideModal}) => {
  
  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const signUp = (id, pass, success, fail) => {
    axios({
      method: 'post',
      url: 'http://localhost:5000/signup',
      data: {
        id,
        pass
      }
    }).then(() => success())
    .catch(err => fail(err))
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (passwordRef.current.value === password2Ref.current.value) {
      signUp(usernameRef.current.value,
        passwordRef.current.value,
        () => {
          alert('account succesfully created');
          hideModal();
        },
        () => {
          alert('account already exists')
        })
    } else {
      alert('passwords do not match');
      passwordRef.current.value = ''
      password2Ref.current.value = ''
    }
  }

  return (
    <>
      <Modal.Header closeButton>Sign Up</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control required placeholder='username' ref={usernameRef}></Form.Control>
            <br/>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='password' ref={passwordRef}></Form.Control>
            <br/>
            <Form.Label>Verify Password</Form.Label>
            <Form.Control required type='password' placeholder='password' ref={password2Ref}></Form.Control>
          </Form.Group>
          <Button type='submit'>Sign Up</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
export default SignUpModal;

