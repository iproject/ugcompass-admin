import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, Field, isDirty } from 'redux-form';

export class EditFacilityDetail extends Component {
  renderField = ({
    input,
    label,
    placeholder,
    type,
    meta: { touched, error, warning },
  }) => {
    const className = `field ${
      touched && error ? 'error' : touched && warning ? 'warning' : ''
    }`;

    return (
      <div className={className}>
        {label && <label>{label}</label>}
        <div>
          <input
            placeholder={placeholder}
            {...input}
            type={type}
            autoComplete='off'
          />
          {/* {touched && error && <span>{error}</span>} */}
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  };

  renderTextAreaField = ({
    input,
    label,
    placeholder,
    type,
    meta: { touched, error, warning },
  }) => {
    const className = `field ${
      touched && error ? 'error' : touched && warning ? 'warning' : ''
    }`;

    return (
      <div className={className}>
        {label && <label>{label}</label>}
        <div>
          <textarea
            placeholder={placeholder}
            {...input}
            type={type}
            autoComplete='off'
          ></textarea>
          {/* {touched && error && <span>{error}</span>} */}
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  };

  renderSelectField = ({
    input,
    label,
    placeholder,
    options,
    type,
    meta: { touched, error, warning },
  }) => {
    const className = `field ${
      touched && error ? 'error' : touched && warning ? 'warning' : ''
    }`;

    return (
      <div className={className}>
        {label && <label>{label}</label>}
        <div>
          <select
            placeholder={placeholder}
            {...input}
            type={type}
            autoComplete='off'
          >
            <option />
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  };

  renderLocation = ({ fields, meta: { warning, touched, submitFailed } }) => {
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
                    <span></span>
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
    const { handleSubmit, facilitiesLoading, isUpdating } = this.props;

    return (
      <div className='container ui'>
        <form
          className={`ui form ${
            facilitiesLoading && 'loading'
          } error edit-facility-detail-form`}
          onSubmit={handleSubmit}
        >
          <h3
            className={`ui dividing header ${isUpdating ? 'orange' : 'blue'}`}
          >
            {isUpdating ? 'Update ' : 'Edit '} Facility Information
          </h3>
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
          <Field
            name='description'
            label='Description'
            placeholder='Enter description'
            component={this.renderTextAreaField}
            style={{
              marginTop: '0px',
              marginBottom: '0px',
              height: '91px',
            }}
          />
          <div className='two fields'>
            <Field
              name='category'
              label='Category'
              component={this.renderSelectField}
              className='ui fluid dropdown'
              options={[
                { name: 'Study', value: 'study' },
                { name: 'Classroom', value: 'classroom' },
                { name: 'General Use', value: 'general_use' },
                { name: 'Laboratory', value: 'laboratory' },
                { name: 'Office', value: 'office' },
                { name: 'Residential', value: 'residential' },
                { name: 'Special Use', value: 'special_use' },
                { name: 'Leased', value: 'leased' },
                { name: 'Support', value: 'support' },
                { name: 'Other', value: 'other' },
              ]}
            />
            <Field
              name='campus'
              label='Campus'
              component={this.renderSelectField}
              className='ui fluid dropdown'
              options={[
                { name: 'Legon', value: 'legon' },
                { name: 'Accra City', value: 'city' },
              ]}
            />
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

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className='ui right labeled icon button black'
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

  if (!formValues.name) {
    errors.name = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  if (!formValues.category) {
    errors.category = 'You must select a category';
  }
  if (!formValues.campus) {
    errors.campus = 'You must select a campus';
  }

  return errors;
};

const warn = (formValues) => {
  const warnings = {};
  // if (
  //   !formValues.location.coordinates ||
  //   !formValues.location.coordinates.length < 1
  // ) {
  //   warnings.location.coordinates = {
  //     _warning: 'You should add both logitude and latitude',
  //   };
  // } else {
  //   const coordinatesArrayWarnings = [];
  //   formValues.location.coordinates.forEach((coordinate, coordinateIndex) => {
  //     if (!coordinate || !coordinate.length) {
  //       coordinatesArrayWarnings[coordinateIndex] = 'Required';
  //     }
  //     if (hobbyArrayErrors.length) {
  //       memberErrors.hobbies = hobbyArrayErrors;
  //       membersArrayErrors[memberIndex] = memberErrors;
  //     }
  //     if (member.hobbies.length > 5) {
  //       if (!memberErrors.hobbies) {
  //         memberErrors.hobbies = [];
  //       }
  //       memberErrors.hobbies._error = 'No more than five hobbies allowed';
  //       membersArrayErrors[memberIndex] = memberErrors;
  //     }
  //   });
  // }

  if (!formValues.address) {
    warnings.address = 'Are you sure you want to leave address empty.';
  }
  if (!formValues.email) {
    warnings.email = 'Are you sure you want to leave email empty.';
  }
  if (!formValues.website) {
    warnings.website = 'Are you sure you want to leave website empty.';
  }
  if (!formValues.phone) {
    warnings.phone = 'Are you sure you want to leave phone empty.';
  }

  return warnings;
};

const mapStateToProps = (state, ownProps) => {
  const { facilitiesLoading, currentFacility } = state.facilities;

  return {
    facilitiesLoading,
    isDirty: isDirty('facilityForm')(state),
    initialValues:
      currentFacility !== null
        ? currentFacility
        : {
            location: {
              coordinates: [-1, 1],
            },
          },
  };
};

const formWrapper = reduxForm({
  form: 'facilityForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: false, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
  warn,
})(EditFacilityDetail);

export default connect(mapStateToProps)(formWrapper);
