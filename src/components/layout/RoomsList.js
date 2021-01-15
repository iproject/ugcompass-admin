import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { deleteRoom } from '../../actions/rooms';

const RoomsList = ({ rooms, roomsLoading, deleteRoom }) => {
  const onDeleteRoom = (room) => {
    const shouldDeleteRoom = window.confirm(
      `Are you sure you want to delete ${room.name}`
    );

    if (shouldDeleteRoom) {
      deleteRoom(room._id);
    }
  };

  return (
    <div className='ui relaxed divided list facilities-list'>
      {rooms &&
        rooms.map((room) => (
          <CSSTransition key={room._id} timeout={500} classNames='item'>
            <div className='item'>
              <div className='content'>
                <Link className='header' to={`/rooms/${room._id}/edit`}>
                  {room.name} |{' '}
                  <span className='user-role'>{room.category}</span>
                </Link>
                <div className='description'>
                  <div className='wrapper'>
                    <div className='text'>{room.description}</div>
                    <div className='controls'>
                      {!roomsLoading ? (
                        <a href='#!' onClick={() => onDeleteRoom(room)}>
                          <i className='icon fa-trash-alt'></i>
                        </a>
                      ) : (
                        <div class='ui active tiny inline loader'></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    roomsLoading: state.rooms.roomsLoading,
  };
};

export default connect(mapStateToProps, { deleteRoom })(RoomsList);
