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
              placeholder='Search facility which contains this room'
              fluid
              loading={facilitiesLoading ? true : false}
              search
              selection
              defaultValue={
                currentRoom
                  ? this.getDropdownDefaultValue(currentRoom.facility).value
                  : null
              }
              disabled={currentRoom ? true : false}
              onChange={(e, { value }) => setSelectedFacility(value)}
              options={this.getFacilitiesForDropDown()}
              noResultsMessage='Try another search.'
            />
          </div>
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
})(EditRoomDetail);

export default connect(mapStateToProps)(formWrapper);
