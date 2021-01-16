import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Navbar from '../layout/MainNavbar';
import Sidebar from '../layout/LeftSidebar';
import {
  createUser,
  fetchUser,
  updateUser,
  clearCurrentUser,
} from '../../actions/users';

class UserEdit extends Component {
  componentDidMount() {
    const isEditing = window.location.pathname.split('/')[3];
    this.userId = this.props.match.params.userId;

    if (this.userId) this.props.fetchUser(this.userId);
    if (isEditing === 'edit') this.isEditing = isEditing;
  }

  componentWillUnmount() {
    // this.props.clearCurrentUser();
  }

  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div
          className='ui error message'
          style={{ padding: '0.25rem 0.5rem', fontSize: '.85rem' }}
        >
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.touched && meta.error ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    );
  };

  passwordValidation = (value) => {
    if (this.isEditing) {
      return undefined;
    } else {
      if (!value) {
        return 'You must enter a password';
      }
    }
  };

  onSubmit = (formValues) => {
    if (this.isEditing) {
      this.props.updateUser(formValues, this.userId);
    } else {
      this.props.createUser(formValues);
    }
  };

  render() {
    const { usersLoading } = this.props;

    return (
      <Fragment>
        <Fragment>
          <Navbar />
          <div className='admin-wrapper'>
            <Sidebar />
            <div className='admin-content'>
              <div>
                <Link
                  className='ui left labeled tiny icon button '
                  style={{ marginTop: '-2rem', marginBottom: '1rem' }}
                  type='button'
                  to='/users'
                >
                  <i className='left arrow icon'></i>
                  Back To List
                </Link>
              </div>

              <div className='container ui'>
                <form
                  className={`ui form ${usersLoading && 'loading'} error`}
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <div className='ui dividing header'>
                    {this.isEditing ? 'Update User' : 'Add User'}
                  </div>
                  <Field
                    name='name'
                    type='name'
                    component={this.renderInput}
                    label='Name'
                  />

                  <Field
                    name='email'
                    type='email'
                    component={this.renderInput}
                    label='Email'
                  />
                  {this.isEditing && (
                    <div className='ui message yellow'>
                      <h1 className='header'>Password Alert</h1>
                      <p>
                        Please do not tamper with users password field if you
                        dont mean to alter user password intentionally. This can
                        prevent the accounts holder from accessing his account.
                      </p>
                    </div>
                  )}
                  <Field
                    name='password'
                    type='password'
                    component={this.renderInput}
                    validate={[this.passwordValidation]}
                    label='Password'
                  />

                  <div class='inline fields'>
                    <label>User role: </label>
                    <div class='field'>
                      <div class='ui radio checkbox'>
                        <Field
                          name='role'
                          component='input'
                          type='radio'
                          value='user'
                          validate={[required]}
                        />{' '}
                        <label>User</label>
                      </div>
                    </div>
                    <div class='field'>
                      <div class='ui radio checkbox'>
                        <Field
                          name='role'
                          component='input'
                          type='radio'
                          value='publisher'
                          validate={[required]}
                        />{' '}
                        <label>Publisher</label>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`ui button ${
                      this.isEditing ? 'green' : 'primary'
                    }`}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      </Fragment>
    );
  }
}

const required = (value) =>
  value || typeof value === 'string' ? undefined : 'Required';

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = 'You must enter a name';
  }
  if (!formValues.email) {
    errors.email = 'You must enter an email';
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { usersLoading, currentUser } = state.users; // * Current user is the fetchedUser

  return {
    usersLoading,
    fetchedUser: currentUser,
    initialValues: currentUser ? currentUser : null,
  };
};

const formWrapper = reduxForm({
  form: 'userForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,

  validate,
})(UserEdit);

export default connect(mapStateToProps, {
  createUser,
  fetchUser,
  updateUser,
  clearCurrentUser,
})(formWrapper);