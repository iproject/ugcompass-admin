import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { deleteUser } from '../../actions/users';

const UsersList = ({ users, usersLoading, deleteUser }) => {
  const onDeleteUser = (user) => {
    const shouldDeleteUser = window.confirm(
      `Are you sure you want to delete ${user.name}`
    );

    if (shouldDeleteUser) {
      deleteUser(user._id);
    }
  };

  return (
    <div className='ui relaxed divided list facilities-list'>
      {users &&
        users.map((user) => (
          <CSSTransition key={user._id} timeout={500} classNames='item'>
            <div className='item'>
              <div className='content'>
                <Link className='header' to={`/users/${user._id}/edit`}>
                  {user.name} |{' '}
                  <span className='user-role'>{user.category}</span>
                </Link>
                <div className='description'>
                  <div className='wrapper'>
                    <div className='text'>{user.description}</div>
                    <div className='controls'>
                      {!usersLoading ? (
                        <a href='#!' onClick={() => onDeleteUser(user)}>
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
    usersLoading: state.users.usersLoading,
  };
};

export default connect(mapStateToProps, { deleteUser })(UsersList);
