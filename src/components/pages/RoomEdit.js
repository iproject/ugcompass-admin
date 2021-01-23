import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import { isDirty, reduxForm } from 'redux-form';
import EditRoomDetail from '../forms/EditRoomDetail';
import EditRoomPhotos from '../forms/EditRoomPhotos';
import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import {
  createRoom,
  fetchRoom,
  updateRoom,
  clearCurrentRoom,
} from '../../actions/rooms';
import { fetchFacilities } from '../../actions/facilities';
import { loadUser } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';

const RoomEdit = (props) => {
  const {
    loadUser,
    currentUser,
    facilities,
    facilitiesLoading,
    fetchFacilities,
    isFormDirty,
    updateRoom,
    clearCurrentRoom,
    createRoom,
    currentRoom,
    roomsLoading,
    setAlert,
  } = props;

  const [page, setPage] = useState(1);
  const [isBlocking, setBlocking] = useState(isFormDirty);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isUpdating, setUpdating] = useState(false);

  useEffect(() => {
    if (!currentUser) loadUser();

    // Check if updating form for style changes
    const path = window.location.pathname.split('/')[2];
    if (path === 'new') {
      setUpdating(false);
    } else {
      setUpdating(true);
    }

    // Fetch facilities for dropDown component
    if (facilities === null) {
      fetchFacilities();
    }

    // Blog navigation on unsaved changes
    setBlocking(isFormDirty);
    if (isBlocking) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
    // eslint-disable-next-line
  }, [facilities, isFormDirty, fetchFacilities, currentUser, loadUser]);

  // Set is blocking to false first time doc load
  useEffect(() => {
    setBlocking(false);

    // eslint-disable-next-line
  }, []);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  // on wizard form submission
  const onSubmit = (formValues) => {
    if (props.match.params.roomId) {
      updateRoom(formValues, currentRoom._id);
    } else {
      createRoom(formValues, selectedFacility);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className='admin-wrapper'>
        <Sidebar />
        <div className='admin-content'>
          <div style={{ marginTop: '0rem', marginBottom: '1rem' }}>
            <Link
              className='ui left labeled tiny icon button '
              type='button'
              to='/rooms'
            >
              <i className='left arrow icon'></i>
              Back To List
            </Link>
            {isBlocking && (
              <span
                style={{
                  marginLeft: '1rem',
                  color: isUpdating ? '#F06B20' : '#2389CE',
                  fontWeight: 'bold',
                }}
              >
                Change(s) Detected
              </span>
            )}
            <Prompt
              when={isBlocking}
              message='You have unsaved changes, are you sure you want to leave?'
            />
            <button
              className='ui right floated button red tiny'
              type='button'
              onClick={() => clearCurrentRoom()}
            >
              Clear Form
            </button>
          </div>

          <Fragment>
            {currentRoom && !roomsLoading ? (
              <Fragment>
                {page === 1 && (
                  <EditRoomDetail
                    facilities={facilities}
                    facilitiesLoading={facilitiesLoading}
                    currentRoom={currentRoom}
                    clearCurrentRoom={clearCurrentRoom}
                    setSelectedFacility={setSelectedFacility}
                    onSubmit={nextPage}
                    isUpdating={isUpdating}
                    selectedFacility={selectedFacility}
                  />
                )}
                {page === 2 && (
                  <EditRoomPhotos
                    previousPage={previousPage}
                    onSubmit={onSubmit}
                    isUpdating={isUpdating}
                    setBlocking={setBlocking}
                  />
                )}
              </Fragment>
            ) : (
              <>
                {page === 1 && (
                  <EditRoomDetail
                    facilities={facilities}
                    facilitiesLoading={facilitiesLoading}
                    onSubmit={nextPage}
                    setSelectedFacility={setSelectedFacility}
                    clearCurrentRoom={clearCurrentRoom}
                    isUpdating={isUpdating}
                    selectedFacility={selectedFacility}
                  />
                )}
                {page === 2 && (
                  <EditRoomPhotos
                    previousPage={previousPage}
                    onSubmit={onSubmit}
                    isUpdating={isUpdating}
                    setBlocking={setBlocking}
                  />
                )}
              </>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { currentRoom, roomsLoading } = state.rooms;
  const { facilities, facilitiesLoading } = state.facilities;
  const { currentUser } = state.auth;

  return {
    isFormDirty: isDirty('roomForm')(state),
    currentUser,
    facilities,
    facilitiesLoading,
    currentRoom,
    roomsLoading,
  };
};

const formWrapper = reduxForm({
  form: 'roomForm', // <------ same form name
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(RoomEdit);

export default connect(mapStateToProps, {
  loadUser,
  createRoom,
  fetchRoom,
  fetchFacilities,
  updateRoom,
  clearCurrentRoom,
  setAlert,
})(formWrapper);
