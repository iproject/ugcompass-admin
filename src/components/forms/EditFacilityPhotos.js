import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

export class EditFacilityPhotos extends Component {
  componentDidMount() {
    const isEditing = window.location.pathname.split('/')[3];
    if (isEditing === 'edit') this.isEditing = isEditing;
    console.log(this.isEditing);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      previousPage,
      submitting,
      facilitiesLoading,
    } = this.props;

    const submitForm = (e) => {
      e.preventDefault();
      this.props.disableNavigationBlocking();
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
                facilitiesLoading ? 'loading' : null
              }`}
              style={{ marginTop: '1rem' }}
              type='submit'
              // disabled={pristine || submitting}
            >
              {this.isEditing ? 'Update Facility' : 'Add Facility'}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    facilitiesLoading: state.facilities.facilitiesLoading,
  };
};

const formWrapper = reduxForm({
  form: 'facilityform', // <------ same form name
  initialValues: { photo: [] },
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EditFacilityPhotos);

export default connect(mapStateToProps)(formWrapper);
