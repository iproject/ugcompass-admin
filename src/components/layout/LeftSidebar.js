import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LeftSidebar = ({ currentUser }) => {
  const path = window.location.pathname.split('/')[1];

  return (
    <div className='left-sidebar'>
      <ul>
        <li className={path === '' ? 'current' : null}>
          <Link to='/'>
            <i className='icon users'></i>
            <span>Dashboard</span>
          </Link>
        </li>
        {currentUser && currentUser.role === 'admin' && (
          <li className={path === 'users' ? 'current' : null}>
            <Link to='/users'>
              <i className='icon users'></i>
              <span>Users</span>
            </Link>
          </li>
        )}
        <li className={path === 'facilities' ? 'current' : null}>
          <Link to='/facilities'>
            <i className='building icon'></i>
            <span>Facilities</span>
          </Link>
        </li>
        <li className={path === 'rooms' ? 'current' : null}>
          <Link to='/rooms'>
            <i className='warehouse icon'></i>
            <span>Rooms</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, null)(LeftSidebar);
