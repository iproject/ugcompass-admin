import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Button, Icon, List } from 'semantic-ui-react';
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
                <Fragment>
                  {!usersLoading ? (
                    <List.Content floated='right'>
                      <Button size='tiny' onClick={() => onDeleteUser(user)}>
                        Delete
                      </Button>
                    </List.Content>
                  ) : (
                    <div className='ui active tiny inline loader'></div>
                  )}
                </Fragment>
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
