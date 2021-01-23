import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

export class EditRoomPhotos extends Component {
  submitForm = (e) => {
    e.preventDefault();
    this.props.setBlocking(false);
    this.props.handleSubmit();
  };

  render() {
    const { previousPage, currentRoom, roomsLoading, isUpdating } = this.props;

    return (
      <Fragment>
        <h3 className={`ui dividing header ${isUpdating ? 'orange' : 'blue'}`}>
          {isUpdating ? 'Update Room Photos' : 'Select Photo for Room'}
        </h3>
        <p>
          <span style={{ color: 'red' }}>Note:</span> You can add a maximum of 3
          photos for a room
        </p>

        <form onSubmit={this.submitForm}>
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
                roomsLoading && 'loading'
              } ${isUpdating ? 'orange' : 'blue'}`}
              style={{ marginTop: '1rem' }}
              type='submit'
            >
              {currentRoom ? 'Update Room' : 'Add Room'}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { roomsLoading, currentRoom } = state.rooms;

  return {
    roomsLoading,
    currentRoom,
    // initialValues: { photo: [] }, // ! Find another way to implement this because it overwrites changes made to the form
  };
};

const formWrapper = reduxForm({
  form: 'roomForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EditRoomPhotos);

export default connect(mapStateToProps)(formWrapper);
