import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/MainNavbar';
import Sidebar from '../layout/LeftSidebar';
import PageLoading from '../layout/PageLoading';
import Statistics from '../layout/Statistics';
import { loadUser } from '../../actions/auth';
import { fetchUsers } from '../../actions/users';
import { fetchRooms } from '../../actions/rooms';
import { fetchFacilities, fetchTopFacilities } from '../../actions/facilities';
import TopFacilities from '../layout/TopFacilities';
import Activities from '../layout/Activities';

export const Dashboard = (props) => {
  const {
    loadUser,
    currentUser,
    authloading,
    fetchRooms,
    fetchUsers,
    fetchFacilities,
    fetchTopFacilities,
    usersLoading,
    topFacilities,
    facilitiesLoading,
    roomsLoading,
    users,
    facilities,
    rooms,
    numberOfUsers,
    numberOfRooms,
    numberOfFacilities,
  } = props;

  useEffect(() => {
    if (!currentUser) loadUser();
    fetchRooms();
    if (currentUser) {
      if (currentUser.role === 'admin') fetchUsers();
    }
    fetchFacilities();
    fetchTopFacilities();
    // eslint-disable-next-line
  }, [currentUser]);

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
                users={users}
                facilities={facilities}
                rooms={rooms}
              />

              <TopFacilities
                topFacilities={topFacilities}
                facilitiesLoading={facilitiesLoading}
              />

              <Activities />
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
    facilities: { facilities, topFacilities, facilitiesLoading },
    rooms: { rooms, roomsLoading },
    users: { users, usersLoading },
  } = state;

  return {
    currentUser,
    authLoading,
    users,
    rooms,
    facilities,
    topFacilities,
    isAuthenticated,
    numberOfFacilities: facilities !== null ? facilities.length : 0,
    numberOfRooms: rooms !== null ? rooms.length : 0,
    numberOfUsers: users !== null ? users.length : 0,
    facilitiesLoading,
    roomsLoading,
    usersLoading,
  };
};

const mapDispatchToProps = {
  loadUser,
  fetchUsers,
  fetchFacilities,
  fetchTopFacilities,
  fetchRooms,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
