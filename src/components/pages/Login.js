import React, { Fragment, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';
import Navbar from '../layout/SimpleNavbar';
import { login, loadUser } from '../../actions/auth';
import history from '../../utils/history';

const Login = (props) => {
  const { loading, isAuthenticated, handleSubmit, login } = props;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
  }) => {
    return (
      <div className='field'>
        <label>{label}</label>
        <div>
          <input
            {...input}
            placeholder={label}
            type={type}
            autoComplete='off'
          />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  };

  const onSubmit = (formValues) => {
    login(formValues);
  };

  const renderForm = () => {
    return (
      <Fragment>
        <Navbar />
        <div className='auth-content'>
          <h2 className='ui header'>Login</h2>

          <form className='ui form' onSubmit={handleSubmit(onSubmit)}>
            <Field
              name='email'
              type='email'
              component={renderField}
              label='Email'
            />

            <Field
              name='password'
              type='password'
              component={renderField}
              label='Password'
            />

            <button
              className={`ui button fluid ${loading ? 'loading' : null}`}
              type='submit'
            >
              Submit
            </button>
            <div className='ui field forgot-password'>
              <a
                href='https://ugcompass.netlify.app/forgotpassword'
                target='_blank'
                rel='noreferrer'
              >
                Forgot password?
              </a>
              <Label basic color='teal' pointing>
                Change password in main application and get back here to
                continue editing.
              </Label>
            </div>
          </form>
        </div>
      </Fragment>
    );
  };

  return <> {renderForm()} </>;
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'This field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'This field is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password should be at least 6 characters long';
  }
  return errors;
};

const mapStateToProps = (state) => {
  const { authLoading, isAuthenticated } = state.auth;

  return {
    loading: authLoading,
    isAuthenticated,
  };
};

const formWrapper = reduxForm({
  form: 'loginForm',
  validate,
})(Login);

export default connect(mapStateToProps, {
  login,
  loadUser,
})(formWrapper);
