import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

export class EditFacilityPhotos extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      previousPage,
      submitting,
      addFacilityLoading,
    } = this.props;

    const submitForm = (e) => {
      e.preventDefault();
      handleSubmit();
    };

    return (
      <Fragment>
        <h3 className='ui dividing header'>Select Photo for Facility</h3>
        <p>
          <span style={{ color: 'red' }}>Note:</span> You can add a maximum of 5
          photos for a facility
        </p>

        <form onSubmit={submitForm}>
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
              className={`ui right right floated icon button green ${
                addFacilityLoading ? 'loading' : null
              }`}
              style={{ marginTop: '1rem' }}
              type='submit'
              // disabled={pristine || submitting}
            >
              Add Facility
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addFacilityLoading: state.facilities.facilitiesLoading,
  };
};

const formWrapper = reduxForm({
  form: 'facilityform', // <------ same form name
  initialValues: { photo: [] },
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(EditFacilityPhotos);

export default connect(mapStateToProps)(formWrapper);
