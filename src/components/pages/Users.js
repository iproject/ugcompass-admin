import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import UsersList from '../layout/UsersList';
import Spinner from '../layout/Spinner';
import {
  fetchUsers,
  filterUsers,
  clearFilteredUsers,
} from '../../actions/users';
import { loadUser } from '../../actions/auth';
import history from '../../utils/history';

const Users = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    loadUser,
    currentUser,
    users,
    filteredUsers,
    fetchUsers,
    filterUsers,
    usersLoading,
    clearFilteredUsers,
  } = props;

  useEffect(() => {
    if (!currentUser) loadUser();
    if (currentUser.role !== 'admin') {
      history.push('/');
      // Todo: Alert user about unauthorized access
    }
    fetchUsers();
    // eslint-disable-next-line
  }, [currentUser, loadUser]);

  useEffect(() => {
    if (searchTerm) {
      filterUsers(searchTerm);
    } else {
      clearFilteredUsers();
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  if (users !== null && users.length === 0 && !usersLoading) {
    return <h4 className='ui header'>Please add a user</h4>;
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
                  placeholder='Search a user...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className='search icon'></i>
              </div>
            </form>
            <Link className='ui primary small button' to='/users/new'>
              Add User
            </Link>
          </div>
          <Fragment>
            {users !== null && !usersLoading ? (
              <TransitionGroup>
                {filteredUsers ? (
                  <UsersList users={filteredUsers} />
                ) : (
                  <UsersList users={users} />
                )}
              </TransitionGroup>
            ) : (
              <div className='spinner-wrapper'>
                <Spinner text={'Loading users...'} size={'medium'} />
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
  const { users, filteredUsers, usersLoading } = state.users;

  return {
    currentUser,
    users,
    filteredUsers,
    usersLoading,
  };
};

export default connect(mapStateToProps, {
  loadUser,
  fetchUsers,
  filterUsers,
  clearFilteredUsers,
})(Users);
