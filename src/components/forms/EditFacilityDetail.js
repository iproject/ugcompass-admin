import React, { Component, Fragment } from 'react';
import { reduxForm, FieldArray, Field } from 'redux-form';

export class EditFacilityDetail extends Component {
  renderField = ({
    input,
    label,
    placeholder,
    type,
    meta: { touched, error },
  }) => (
    <div className='field'>
      {label && <label>{label}</label>}
      <div>
        <input
          placeholder={placeholder}
          {...input}
          type={type}
          autoComplete='off'
        />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  renderLocation = ({ fields, meta: { error, submitFailed } }) => {
    return (
      <Fragment>
        <div className='field'>
          <label>Location Coordinates</label>
          <div className='two fields'>
            <Field
              name='location.longitude'
              type='number'
              component={this.renderField}
              placeholder='Longitude'
            />
            <Field
              name='location.latitude'
              type='number'
              component={this.renderField}
              placeholder='Latitude'
            />
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return (
      <div className='container ui'>
        <form className='ui form' onSubmit={this.props.handleSubmit}>
          <h3 className='ui dividing header'>Edit Facility Information</h3>
          <Field
            name='name'
            type='text'
            component={this.renderField}
            label='Name'
            placeholder='Enter name'
          />
          <div className='field'>
            <label>Description</label>
            <div>
              <Field
                name='description'
                placeholder='Enter description'
                component='textarea'
                style={{
                  marginTop: '0px',
                  marginBottom: '0px',
                  height: '91px',
                }}
              />
            </div>
          </div>
          <div className='two fields'>
            <div className='field'>
              <label>Category</label>
              <Field
                name='category'
                component='select'
                className='ui fluid dropdown'
              >
                <option />
                <option value='study'>Study</option>
                <option value='classroom'>Classroom</option>
                <option value='general_use'>General Use</option>
                <option value='laboratory'>Laboratory</option>
                <option value='office'>Office</option>
                <option value='residential'>Residential</option>
                <option value='special_use'>Special Use</option>
                <option value='leased'>Leased</option>
                <option value='support'>Support</option>
                <option value='other'>Other</option>
              </Field>
            </div>

            <div className='field'>
              <label>Campus</label>
              <Field
                name='campus'
                component='select'
                className='ui fluid dropdown'
              >
                <option />
                <option value='legon'>Legon</option>
                <option value='city'>Accra City</option>
              </Field>
            </div>
          </div>

          <FieldArray name='location' component={this.renderLocation} />

          <Field
            name='address'
            type='text'
            component={this.renderField}
            label='Address'
            placeholder='Enter address of facility'
          />
          <Field
            name='email'
            type='email'
            component={this.renderField}
            label='Email'
            placeholder='Enter email of facility'
          />
          <Field
            name='Website'
            type='text'
            component={this.renderField}
            label='Website'
            placeholder='Enter website of facility'
          />
          <Field
            name='phone'
            type='number'
            component={this.renderField}
            label='Phone'
            placeholder='Enter phone of facility'
          />

          <div>
            <button
              className='ui right labeled right floated icon button black'
              style={{ marginTop: '1rem' }}
              type='submit'
            >
              <i className='right arrow icon'></i>
              Next Page
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'facilityform', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: false, // <------ unregister fields on unmount
  updateUnregisteredFields: true,
  validate,
})(EditFacilityDetail);
