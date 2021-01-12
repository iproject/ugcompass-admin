import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

export class EditFacilityWorkingHours extends Component {
  state = {
    workingHourFields: 1,
  };

  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
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

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  renderWorkingHours = () => {
    var rows = [];

    for (var i = 0; i < this.state.workingHourFields; i++) {
      const row = (
        <div className='working-hours-wrapper' key={i}>
          <div className='Days'>
            <label>Day</label>
            <br />
            <Field
              name={`workingDay${this.state.workingHourFields}`}
              className='days'
              component='select'
            >
              <option value='monday'>Monday</option>
              <option value='tuesday'>Tuesday</option>
              <option value='wednesday'>Wednesday</option>
              <option value='thursday'>Thursday</option>
              <option value='friday'>Friday</option>
              <option value='saturday'>Saturday</option>
              <option value='sunday'>Sunday</option>
            </Field>
          </div>
          <div className='Start-time'>
            <Field
              name={`startTime${this.state.workingHourFields}`}
              type='time'
              label='Start Time'
              component={this.renderField}
              className='time'
            />
          </div>
          <div className='End-time'>
            <Field
              name={`endTime${this.state.workingHourFields}`}
              type='time'
              label='End Time'
              component={this.renderField}
              className='time'
            />
          </div>
        </div>
      );

      rows.push(row);
    }

    return rows;
  };

  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h3 className='ui dividing header'>Edit Facility Information</h3>
          <Field type='text' component='input' name='time' />

          <div>
            <button
              className='ui left floated button black labeled icon'
              style={{ marginTop: '1rem' }}
              type='button'
              onClick={previousPage}
            >
              <i className='left arrow icon'></i>
              Previous Page
            </button>

            <button
              class='ui right labeled right floated icon button black'
              style={{ marginTop: '1rem' }}
              type='submit'
            >
              <i class='right arrow icon'></i>
              Next Page
            </button>
          </div>
        </form>

        {/* <label>Working Hours</label>
        <div className='working-hours'>{this.renderWorkingHours()}</div>
        <div className='New-hour'>
          <button
            className='btn new-hour'
            onClick={() =>
              this.setState({
                workingHourFields: this.state.workingHourFields + 1,
              })
            }
          >
            New Hour
          </button>
        </div> */}
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
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(EditFacilityWorkingHours);
