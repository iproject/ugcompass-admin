import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const MainNavbar = ({ currentUser, logout }) => {
  return (
    <header className='main-header'>
      <a href='dashboard.html'>
        <h1 className='ui header'>UG COMPASS ADMIN</h1>
      </a>
      <div>
        <div className='text' style={{ marginRight: '1rem' }}>
          <i className='user circle icon'></i>
          <span>{currentUser.name}</span>
        </div>
        <button className='ui button small red' onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});
export default connect(mapStateToProps, {
  logout,
})(MainNavbar);
