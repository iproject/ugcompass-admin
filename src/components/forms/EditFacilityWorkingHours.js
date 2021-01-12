import React, { Component, Fragment } from 'react';
import { reduxForm, FieldArray, Field } from 'redux-form';

export class EditFacilityWorkingHours extends Component {
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
  renderWorkingHours = ({ fields, meta: { error, submitFailed } }) => {
    return (
      <Fragment>
        {fields.map((hour, index) => (
          <div className='ui segment' key={index}>
            <div className='three fields'>
              <div className='field'>
                <label>Day</label>
                <Field name={`${hour}.day`} component='select'>
                  <option value='weekdays'>Weekdays</option>
                  <option value='monday'>Monday</option>
                  <option value='tuesday'>Tuesday</option>
                  <option value='wednesday'>Wednesday</option>
                  <option value='thursday'>Thursday</option>
                  <option value='friday'>Friday</option>
                  <option value='saturday'>Saturday</option>
                  <option value='sunday'>Sunday</option>
                </Field>
              </div>
              <Field
                name={`${hour}.open`}
                type='time'
                label='Start Time'
                component={this.renderField}
                className='time'
              />
              <Field
                name={`${hour}.close`}
                type='time'
                label='End Time'
                component={this.renderField}
                className='time'
              />
            </div>
          </div>
        ))}
        <button
          className='ui button primary'
          type='button'
          onClick={() => fields.push({})}
        >
          Add Hour
        </button>
        {submitFailed && error && <span>{error}</span>}
      </Fragment>
    );
  };

  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form className='ui form' onSubmit={handleSubmit}>
        <h3 className='ui dividing header'>Add Working Hours</h3>

        <FieldArray name='hours' component={this.renderWorkingHours} />

        <div style={{ marginTop: '2rem' }}>
          <button
            className='ui left labeled left floated icon button black'
            style={{ marginTop: '1rem' }}
            type='button'
            onClick={previousPage}
          >
            <i className='left arrow icon'></i>
            Previous Page
          </button>

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
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(EditFacilityWorkingHours);
