import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, isDirty } from 'redux-form';
import { Dropdown } from 'semantic-ui-react';

export class EditRoomDetail extends Component {
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

  getFacilitiesForDropDown = () => {
    let facilities = [];
    this.props.facilities.forEach((facility, index) => {
      facilities.push({
        key: index,
        text: facility.name,
        value: facility._id,
      });
    });
    return facilities;
  };

  getDropdownDefaultValue = (facilityId) => {
    const found = this.getFacilitiesForDropDown().find(
      (item) => item.value === facilityId
    );
    return found;
  };

  render() {
    const {
      handleSubmit,
      roomsLoading,
      currentRoom,
      setSelectedFacility,
      selectedFacility,
      facilitiesLoading,
      isUpdating,
    } = this.props;

    return (
      <div className='container ui'>
        <form
          className={`ui form ${
            roomsLoading && 'loading'
          } error edit-facility-detail-form`}
          onSubmit={handleSubmit}
        >
          <h3
            className={`ui dividing header ${isUpdating ? 'orange' : 'blue'}`}
          >
            {isUpdating ? 'Update Room Information' : 'Edit Room Information'}
          </h3>
          {roomsLoading && (
            <div className='ui compact message populating-form-msg'>
              <p>Populating form. Please wait...</p>
            </div>
          )}
          <div className='field'>
            <label>Select Facility</label>
            <Dropdown
              placeholder='Search facility'
              fluid
              loading={facilitiesLoading ? true : false}
              search
              selection
              defaultValue={
                currentRoom
                  ? this.getDropdownDefaultValue(currentRoom.facility).value
                  : selectedFacility
              }
              disabled={currentRoom ? true : false}
              onChange={(e, { value }) => setSelectedFacility(value)}
              options={this.getFacilitiesForDropDown()}
              error={!currentRoom && !selectedFacility ? true : false}
              noResultsMessage='Try another search.'
              style={{
                color: selectedFacility ? '#4E784D' : null,
                borderColor: selectedFacility ? '#A4C195' : null,
                backgroundColor: selectedFacility ? '#FCFFF5' : null,
              }}
            />
          </div>
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
          <div className='two fields'>
            <Field
              name='address'
              type='text'
              component={this.renderField}
              label='Address'
              placeholder='Enter address of room'
            />
            <Field
              name='phone'
              type='text'
              component={this.renderField}
              label='Phone'
              placeholder='Enter phone of room'
            />
          </div>

          <div className='two fields'>
            <Field
              name='email'
              type='email'
              component={this.renderField}
              label='Email'
              placeholder='Enter email of room'
            />
            <Field
              name='website'
              type='text'
              component={this.renderField}
              label='Website'
              placeholder='Enter website of room'
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className='ui right labeled icon button black'
              style={{ marginTop: '1rem' }}
              type='submit'
              disabled={selectedFacility || currentRoom ? false : true}
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
  return errors;
};

const warn = (formValues) => {
  const warnings = {};
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
  const { roomsLoading, currentRoom } = state.rooms;

  return {
    roomsLoading,
    isDirty: isDirty('roomForm')(state),
    initialValues: currentRoom !== null ? currentRoom : null,
  };
};

const formWrapper = reduxForm({
  form: 'roomForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: false, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
  warn,
})(EditRoomDetail);

export default connect(mapStateToProps)(formWrapper);
