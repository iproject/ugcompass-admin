import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/MainNavbar';
import Sidebar from '../layout/LeftSidebar';
import PageLoading from '../layout/PageLoading';
import Statistics from '../layout/Statistics';
import { loadUser } from '../../actions/auth';
import { fetchUsers } from '../../actions/users';
import { fetchRooms } from '../../actions/rooms';
import { fetchFacilities } from '../../actions/facilities';

export const Dashboard = (props) => {
  const {
    loadUser,
    currentUser,
    authloading,
    fetchRooms,
    fetchUsers,
    fetchFacilities,
    usersLoading,
    facilitiesLoading,
    roomsLoading,
    numberOfUsers,
    numberOfRooms,
    numberOfFacilities,
  } = props;

  useEffect(() => {
    if (!currentUser) loadUser();
    fetchRooms();
    fetchFacilities();
    if (currentUser) {
      if (currentUser.role === 'admin') fetchUsers();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {currentUser !== null && !authloading ? (
        <div>
          <Navbar />

          <main className='admin-wrapper'>
            <Sidebar />
            <div className='admin-content'>
              <Statistics
                currentUser={currentUser}
                facilitiesLoading={facilitiesLoading}
                roomsLoading={roomsLoading}
                usersLoading={usersLoading}
                numberOfFacilities={numberOfFacilities}
                numberOfUsers={numberOfUsers}
                numberOfRooms={numberOfRooms}
              />
            </div>
          </main>
        </div>
      ) : (
        <PageLoading />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: { authLoading, currentUser, isAuthenticated },
    facilities: { facilities, facilitiesLoading },
    rooms: { rooms, roomsLoading },
    users: { users, usersLoading },
  } = state;

  return {
    currentUser,
    authLoading,
    users,
    rooms,
    facilities,
    isAuthenticated,
    numberOfFacilities: facilities !== null ? facilities.length : null,
    numberOfRooms: rooms !== null ? rooms.length : null,
    numberOfUsers: users !== null ? users.length : null,
    facilitiesLoading,
    roomsLoading,
    usersLoading,
  };
};

const mapDispatchToProps = {
  loadUser,
  fetchUsers,
  fetchFacilities,
  fetchRooms,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
