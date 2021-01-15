import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Navbar from '../layout/SimpleNavbar';
import { login, loadUser } from '../../actions/auth';
import history from '../../utils/history';
class Login extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      history.push('/');
    }
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
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

  onSubmit = (formValues) => {
    this.props.login(formValues);
  };

  renderForm = () => {
    return (
      <Fragment>
        <Navbar />
        <div className='auth-content'>
          <h2 className='ui header'>Login</h2>

          <form
            className='ui form'
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
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

            <button
              className={`ui button fluid ${
                this.props.loading ? 'loading' : null
              }`}
              type='submit'
            >
              Submit
            </button>
            <div className='ui field forgot-password'>
              <Link to='/forgotpassword'>Forgot password?</Link>
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
