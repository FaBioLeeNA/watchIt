import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSocket } from '../contexts/SocketProvider';

const CreateRoomModal = ({ closeModal }) => {
  const roomNameRef = useRef('');
  const { socket } = useSocket();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const roomName = roomNameRef.current.value;
  //   axios.post(`http://localhost:5000/${roomName}`)
  //   .then(data => data.data)
  //   .then(({roomName}) => {
  //     window.location = `/${roomName}`
  //   })
  //   .catch(err => console.error(err)); 

  //   roomNameRef.current.value = ''
  //   closeModal();
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomName = roomNameRef.current.value;
    socket.emit('create new room', roomName, socket.id);
    closeModal();
  }

  return (
    <div>
      <Modal.Header closeButton>Create Room</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control ref={roomNameRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
}

export default CreateRoomModal;
