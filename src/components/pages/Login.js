import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SimpleNavbar from '../layout/SimpleNavbar';
import { login } from '../../actions/auth';

class Login extends Component {
  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input
            {...input}
            placeholder={label}
            type={type}
            className='text-input'
            autoComplete='off'
          />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.login(formValues);
  };

  renderForm = () => {
    return (
      <Fragment>
        <SimpleNavbar />
        <div className='auth-content'>
          <h2 className='form-title'>Login</h2>

          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              name='email'
              type='email'
              component={this.renderField}
              label='Email'
            />

            <Field
              name='password'
              type='password'
              component={this.renderField}
              label='Password'
            />

            <div>
              <button type='submit' name='Login' className='btn btn-big'>
                Login
              </button>
            </div>

            <div>
              <p>
                <a href='forgotpassword.html'>Forgot password?</a>
              </p>
            </div>
          </form>
        </div>
      </Fragment>
    );
  };

  render() {
    return <> {this.renderForm()} </>;
  }
}

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

const formWrapper = reduxForm({
  form: 'loginForm',
  validate,
})(Login);

export default connect(null, {
  login,
})(formWrapper);
