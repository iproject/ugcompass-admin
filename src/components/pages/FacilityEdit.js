import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import { isDirty, reduxForm } from 'redux-form';
import EditFacilityDetail from '../forms/EditFacilityDetail';
import EditFacilityPhotos from '../forms/EditFacilityPhotos';
import EditFacilityWorkingHours from '../forms/EditFacilityWorkingHours';
import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import {
  createFacility,
  fetchFacility,
  updateFacility,
  clearCurrentFacility,
} from '../../actions/facilities';
import { loadUser } from '../../actions/auth';

const FacilityEdit = (props) => {
  const {
    loadUser,
    currentUser,
    isFormDirty,
    updateFacility,
    clearCurrentFacility,
    createFacility,
    currentFacility,
    facilitiesLoading,
  } = props;

  const [page, setPage] = useState(1);
  const [isBlocking, setBlocking] = useState(isFormDirty);
  const [isUpdating, setUpdating] = useState(false);

  useEffect(() => {
    if (!currentUser) loadUser();
    // Check if updating form for style changes
    const path = window.location.pathname.split('/')[2];
    if (path === 'new') {
      setUpdating(false);
    } else {
      setUpdating(true);
    }

    // Blog navigation on unsaved changes
    setBlocking(isFormDirty);
    if (isBlocking) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
    // eslint-disable-next-line
  }, [isFormDirty, isBlocking, currentUser, loadUser]);

  // Set is blocking to false first time doc load
  useEffect(() => {
    setBlocking(false);

    // eslint-disable-next-line
  }, []);

  const disableNavigationBlocking = () => {
    setBlocking(false);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  // on wizard form submission
  const onSubmit = (formValues) => {
    if (props.match.params.facilityId) {
      updateFacility(formValues, currentFacility._id);
    } else {
      createFacility(formValues);
    }
    clearCurrentFacility();
  };

  return (
    <Fragment>
      <Navbar />
      <div className='admin-wrapper'>
        <Sidebar />
        <div className='admin-content'>
          <div style={{ marginTop: '0rem', marginBottom: '1rem' }}>
            <Link
              className='ui left labeled tiny icon button '
              type='button'
              to='/facilities'
            >
              <i className='left arrow icon'></i>
              Back To List
            </Link>
            {isBlocking && (
              <span
                style={{
                  marginLeft: '1rem',
                  color: 'orange',
                  fontWeight: 'bold',
                }}
              >
                Change(s) Detected
              </span>
            )}
            <Prompt
              when={isBlocking}
              message='You have unsaved changes, are you sure you want to leave?'
            />
            <button
              className='ui right floated button red tiny'
              type='button'
              onClick={() => clearCurrentFacility()}
            >
              Clear Form
            </button>
          </div>

          <Fragment>
            {currentFacility && !facilitiesLoading ? (
              <Fragment>
                {page === 1 && (
                  <EditFacilityDetail
                    currentFacility={currentFacility}
                    clearCurrentFacility={clearCurrentFacility}
                    onSubmit={nextPage}
                    isUpdating={isUpdating}
                  />
                )}
                {page === 2 && (
                  <EditFacilityWorkingHours
                    previousPage={previousPage}
                    onSubmit={nextPage}
                    isUpdating={isUpdating}
                  />
                )}
                {page === 3 && (
                  <EditFacilityPhotos
                    previousPage={previousPage}
                    onSubmit={onSubmit}
                    isUpdating={isUpdating}
                    disableNavigationBlocking={disableNavigationBlocking}
                  />
                )}
              </Fragment>
            ) : (
              <>
                {page === 1 && (
                  <EditFacilityDetail
                    onSubmit={nextPage}
                    isUpdating={isUpdating}
                    clearCurrentFacility={clearCurrentFacility}
                  />
                )}
                {page === 2 && (
                  <EditFacilityWorkingHours
                    previousPage={previousPage}
                    onSubmit={nextPage}
                    isUpdating={isUpdating}
                  />
                )}
                {page === 3 && (
                  <EditFacilityPhotos
                    previousPage={previousPage}
                    onSubmit={onSubmit}
                    isUpdating={isUpdating}
                    disableNavigationBlocking={disableNavigationBlocking}
                  />
                )}
              </>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { currentFacility, facilitiesLoading } = state.facilities;
  const { currentUser } = state.auth;
  return {
    isFormDirty: isDirty('facilityForm')(state),
    currentUser,
    currentFacility,
    facilitiesLoading,
  };
};

const formWrapper = reduxForm({
  form: 'facilityForm', // <------ same form name
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(FacilityEdit);

export default connect(mapStateToProps, {
  loadUser,
  createFacility,
  fetchFacility,
  updateFacility,
  clearCurrentFacility,
})(formWrapper);
