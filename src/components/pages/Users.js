import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import { fetchUsers } from '../../actions/users';

const Publishers = ({ fetchUsers, users }) => {
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className='admin-wrapper'>
        <Sidebar />
        <div className='admin-content'>
          <div className='top-section'>
            <div className='search section'>
              <form>
                <input
                  type='text'
                  name='search-term'
                  className='search-input'
                  placeholder='search...'
                />
              </form>
            </div>
            &nbsp;
            <button className='btn'>
              <Link to='/users/new'>Add User</Link>
            </button>
          </div>
          <br />
          <div className='main-section'>
            {users &&
              users.map((user) => (
                <div key={user._id} className='admin-btn'>
                  <p>
                    {user.name} | <span className='user-role'>{user.role}</span>
                  </p>
                  <div className='controls'>
                    <Link to='/users/edit'>
                      <i className='fas fa-edit'></i>
                    </Link>
                    <Link to='/users/delete'>
                      <i className='fas fa-trash-alt'></i>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, { fetchUsers })(Publishers);
