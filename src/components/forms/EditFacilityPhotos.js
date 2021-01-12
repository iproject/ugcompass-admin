import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';

export class EditFacilityPhotos extends Component {
  render() {
    const { handleSubmit, pristine, previousPage, submitting } = this.props;

    return (
      <Fragment>
        <h2 className='form-title'>Select Photo for Facility</h2>
        <br />
        <p>You can add a maximum of 5 photos for a room</p>
        <form onSubmit={handleSubmit}>
          <div>
            <div className='form-group'>
              <img src='images/placeholder1.jpg' id='roomPhoto' alt='' />
              <input
                type='file'
                name='roomPhoto'
                id='PhotoR'
                className='form-control'
                stxyle='display: none'
              />
            </div>
          </div>

          <div>
            <button type='button' className='previous' onClick={previousPage}>
              Previous
            </button>
            <button
              className='add-btn'
              type='submit'
              disabled={pristine || submitting}
            >
              Submit
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'facilityform', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(EditFacilityPhotos);
