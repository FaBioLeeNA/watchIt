import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import CreateRoomModal from './CreateRoomModal';
import { useRooms } from '../contexts/RoomsProvider';

const Lobby = () => {
  const {rooms} = useRooms();
  const [modalOpen, setModalOpen] = useState(false);

  const openCreateRoomModal = e => {
    e.preventDefault();
    setModalOpen(true);
  }

  const closeCreateRoomModal = () => {
    setModalOpen(false);
  }

  return (
    <div>
      Rooms
      {rooms.map(room => <div key={room.id}>{room.roomName}</div>)}
      <Form onSubmit={openCreateRoomModal}>
        <Form.Group>
          <Button type="submit" variant="primary">Create Room</Button>
        </Form.Group>
      </Form>
      <Button onClick = {() => {console.log(rooms)}} >test</Button>
      <Modal show={modalOpen} onHide={closeCreateRoomModal}>
        <CreateRoomModal closeModal={closeCreateRoomModal}></CreateRoomModal>
      </Modal>
    </div>
  );
}

export default Lobby;
