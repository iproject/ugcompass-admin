import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import RoomsList from '../rooms/RoomsList';
import Spinner from '../layout/Spinner';
import {
  fetchRooms,
  filterRooms,
  clearFilteredRooms,
} from '../../actions/rooms';
import { loadUser } from '../../actions/auth';

const Rooms = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    currentUser,
    rooms,
    filteredRooms,
    fetchRooms,
    filterRooms,
    roomsLoading,
    clearFilteredRooms,
  } = props;

  useEffect(() => {
    if (!currentUser) loadUser();
    fetchRooms();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchTerm) {
      filterRooms(searchTerm);
    } else {
      clearFilteredRooms();
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  if (rooms !== null && rooms.length === 0 && !roomsLoading) {
    return <h4 className='ui header'>Please add a room</h4>;
  }

  return (
    <Fragment>
      <Navbar />

      <div className='admin-wrapper'>
        <Sidebar />

        <div className='admin-content'>
          <div className='search-form'>
            <form>
              <div className='ui small icon input'>
                <input
                  type='text'
                  placeholder='Search a room...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className='search icon'></i>
              </div>
            </form>
            <Link className='ui  primary small button' to='/rooms/new'>
              Add Room
            </Link>
          </div>
          <Fragment>
            {rooms !== null && !roomsLoading ? (
              <TransitionGroup>
                {filteredRooms ? (
                  <RoomsList rooms={filteredRooms} />
                ) : (
                  <RoomsList rooms={rooms} />
                )}
              </TransitionGroup>
            ) : (
              <div className='spinner-wrapper'>
                <Spinner text={'Loading rooms...'} size={'medium'} />
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { currentUser } = state.auth;
  const { rooms, filteredRooms, roomsLoading } = state.rooms;

  return {
    currentUser,
    rooms,
    filteredRooms,
    roomsLoading,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  filterRooms,
  clearFilteredRooms,
})(Rooms);
