import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRooms } from '../contexts/RoomsProvider'

const CreateRoomModal = ({ closeModal }) => {
  const { addRoom } = useRooms()
  const roomNameRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomName = roomNameRef.current.value;
    axios.post(`http://localhost:5000/${roomName}`)
    .then(data => data.data)
    .then(data => addRoom(data))
    .catch(err => console.error(err)); 

    roomNameRef.current.value = ''
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
