import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Button, Icon, Image, List } from 'semantic-ui-react';
import { deleteUser } from '../../actions/users';

const UsersList = ({ users, usersLoading, deleteUser, currentUser }) => {
  const onDeleteUser = (user) => {
    const shouldDeleteUser = window.confirm(
      `Are you sure you want to delete ${user.name}`
    );

    if (shouldDeleteUser) {
      deleteUser(user._id);
    }
  };

  return (
    <List divided verticalAlign='middle' className='users-list'>
      {users &&
        users.map((user) => (
          <CSSTransition key={user._id} timeout={500} classNames='item'>
            <List.Item>
              {currentUser.role === 'admin' && (
                <List.Content floated='right'>
                  <Button size='tiny'>Delete</Button>
                </List.Content>
              )}
              <Icon name='user' size='large' />

              <List.Content className='header'>
                <Link className='header' to={`/users/${user._id}/edit`}>
                  {user.name} |{' '}
                  <span
                    style={{
                      color: '#333',
                      textTransform: 'uppercase',
                      fontSize: '.75rem',
                    }}
                  >
                    {user.role}
                  </span>
                </Link>
              </List.Content>
            </List.Item>

            {/* <div className='item'>
              <div className='content'>
                <Link className='header' to={`/users/${user._id}/edit`}>
                  {user.name} | <span className='user-role'>{user.role}</span>
                </Link>
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
            </div> */}
          </CSSTransition>
        ))}
    </List>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    usersLoading: state.users.usersLoading,
  };
};

export default connect(mapStateToProps, { deleteUser })(UsersList);
