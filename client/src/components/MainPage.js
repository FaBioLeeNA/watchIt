import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoginModal from './LoginModal';
import styled from 'styled-components'
import SignUpModal from './SignupModal';

const ButtonContainer = styled.div `
  display: flex;
  justify-content: space-around;
`


const MainPage = ({ setLoged }) => {

  const [loginModalOpen, setLoginModalOpen ] = useState(false);
  const [signupModalOpen, setSignupModalOpen ] = useState(false);

  useEffect(() => {

    return () => {
    }
  });

  const hideLoginModal = () => {
    setLoginModalOpen(false);
  }

  const hideSignupModal = () => {
    setSignupModalOpen(false)
  }
  return (
    <div className='d-flex flex-column'>
      <h1 className='d-flex justify-content-center'>Main Page</h1>
      <ButtonContainer>
        <Button onClick={() => setLoginModalOpen(true)}>Login</Button>
        <Button onClick={() => setSignupModalOpen(true)}>Sign Up</Button>
      </ButtonContainer>

      <Modal show={loginModalOpen} onHide={hideLoginModal}>
        <LoginModal setLoged={setLoged} hideModal={hideLoginModal}></LoginModal>
      </Modal>
        
      <Modal show={signupModalOpen} onHide={hideSignupModal}>
        <SignUpModal hideModal={hideSignupModal}></SignUpModal>
      </Modal>
    </div>
  );
}

export default MainPage;
