import React, { useState } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import CreateRoomModal from './CreateRoomModal';
import { useRooms } from '../contexts/RoomsProvider';
import { Link } from 'react-router-dom'

const RoomList = () => {
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
    <div className='d-flex flex-column' style={{width: '250px'}}>
      Rooms
            
      <ListGroup>
        {rooms.map(room => (
          <ListGroup.Item key={room.id}>
            <Link to={`/rooms/${room.id}`}>
              {room.roomName}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button onClick={openCreateRoomModal} variant="primary">Create Room</Button>
      <Button onClick = {() => {console.log(rooms)}} >test</Button>
      <Modal show={modalOpen} onHide={closeCreateRoomModal}>
        <CreateRoomModal closeModal={closeCreateRoomModal}></CreateRoomModal>
      </Modal>
    </div>
  );
}

export default RoomList;
