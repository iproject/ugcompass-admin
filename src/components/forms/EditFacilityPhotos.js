import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
export class EditFacilityPhotos extends Component {
  render() {
    const {
      handleSubmit,
      previousPage,
      currentFacility,
      facilitiesLoading,
      isUpdating,
    } = this.props;

    const submitForm = (e) => {
      e.preventDefault();
      this.props.disableNavigationBlocking();
      handleSubmit();
    };

    return (
      <Fragment>
        <h3 className={`ui dividing header ${isUpdating ? 'orange' : 'blue'}`}>
          {isUpdating ? 'Update Facility Photos' : 'Select Photo for Facility'}
        </h3>
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
                id='Photo'
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
              className={`ui right floated icon button ${
                facilitiesLoading ? 'loading' : null
              }  ${isUpdating ? 'orange' : 'blue'}`}
              style={{ marginTop: '1rem' }}
              type='submit'
            >
              {currentFacility ? 'Update Facility' : 'Add Facility'}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { facilitiesLoading, currentFacility } = state.facilities;

  return {
    facilitiesLoading,
    currentFacility,
    // initialValues: { photo: [] }, // ! Find another way to implement this because it overwrites changes made to the form
  };
};

const formWrapper = reduxForm({
  form: 'facilityForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EditFacilityPhotos);

export default connect(mapStateToProps)(formWrapper);
