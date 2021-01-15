import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
            {fields.map((coord, index) => {
              if (index === 0) {
                return (
                  <div className='field' key={index}>
                    <h6 className='ui header'>Longitude</h6>
                    <Field
                      name={coord}
                      type='number'
                      component={this.renderField}
                      placeholder='Longitude'
                      step='0.0005'
                    />
                  </div>
                );
              } else {
                return (
                  <div className='field' key={index}>
                    <h6 className='ui header'>Latitude</h6>
                    <Field
                      name={coord}
                      type='number'
                      component={this.renderField}
                      placeholder='Latitude'
                      step='0.0005'
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    const { handleSubmit, facilitiesLoading } = this.props;

    return (
      <div className='container ui'>
        <form
          className='ui form edit-facility-detail-form'
          onSubmit={handleSubmit}
        >
          <h3 className='ui dividing header'>Edit Facility Information</h3>
          {facilitiesLoading && (
            <div className='ui compact message populating-form-msg'>
              <p>Populating form. Please wait...</p>
            </div>
          )}
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
          <FieldArray
            name='location.coordinates'
            component={this.renderLocation}
          />
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
            name='website'
            type='text'
            component={this.renderField}
            label='Website'
            placeholder='Enter website of facility'
          />
          <Field
            name='phone'
            type='text'
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

const mapStateToProps = (state, ownProps) => {
  const { facilitiesLoading } = state.facilities;

  console.log('CurrentFacility: ', ownProps.currentFacility);

  return {
    facilitiesLoading,
    initialValues:
      ownProps.currentFacility !== null
        ? ownProps.currentFacility
        : {
            location: {
              coordinates: [-1, 1],
            },
          },
  };
};

const formWrapper = reduxForm({
  form: 'facilityform', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: false, // <------ unregister fields on unmount
  updateUnregisteredFields: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(EditFacilityDetail);

export default connect(mapStateToProps)(formWrapper);
