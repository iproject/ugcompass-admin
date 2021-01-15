import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import { isDirty } from 'redux-form';
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

class FacilityEdit extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      isBlocking: this.props.isDirty,
    };
  }

  componentDidMount() {
    this.facilityId = this.props.match.params.facilityId;

    if (this.facilityId) {
      this.props.fetchFacility(this.facilityId);
    }
  }

  componentDidUpdate = (prevProps) => {
    // Update navigation blocking state
    if (this.props.isDirty !== prevProps.isDirty) {
      this.setState({ isBlocking: this.props.isDirty });
    }
    // Prevent navigation if form is not saved
    if (this.state.isBlocking) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = () => undefined;
    }
  };

  componentWillUnmount() {
    window.onbeforeunload = () => false;
  }

  shouldBlockNavigation = () => {
    this.setState({ isDirty: this.props.isDirty });
    return this.state.isDirty;
  };

  disableNavigationBlocking = () => {
    this.setState({ isBlocking: false });
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  // on wizard form submission
  onSubmit = (formValues) => {
    if (this.facilityId) {
      this.props.updateFacility(formValues, this.facilityId);
      this.props.clearCurrentFacility();
    } else {
      this.props.createFacility(formValues);
    }
  };

  render() {
    const { currentFacility, facilitiesLoading, isDirty } = this.props;
    const { page, isBlocking } = this.state;

    return (
      <Fragment>
        <Navbar />
        <div className='admin-wrapper'>
          <Sidebar />
          <div className='admin-content'>
            <div>
              <Link
                className='ui left labeled tiny icon button '
                style={{ marginTop: '-2rem', marginBottom: '1rem' }}
                type='button'
                to='/facilities'
              >
                <i className='left arrow icon'></i>
                Back To List
              </Link>
              {isDirty && (
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
            </div>

            <Fragment>
              {currentFacility && !facilitiesLoading ? (
                <Fragment>
                  {page === 1 && (
                    <EditFacilityDetail
                      currentFacility={currentFacility}
                      onSubmit={this.nextPage}
                    />
                  )}
                  {page === 2 && (
                    <EditFacilityWorkingHours
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                    />
                  )}
                  {page === 3 && (
                    <EditFacilityPhotos
                      previousPage={this.previousPage}
                      onSubmit={this.onSubmit}
                      disableNavigationBlocking={this.disableNavigationBlocking}
                    />
                  )}
                </Fragment>
              ) : (
                <>
                  {page === 1 && (
                    <EditFacilityDetail onSubmit={this.nextPage} />
                  )}
                  {page === 2 && (
                    <EditFacilityWorkingHours
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                    />
                  )}
                  {page === 3 && (
                    <EditFacilityPhotos
                      previousPage={this.previousPage}
                      onSubmit={this.onSubmit}
                      disableNavigationBlocking={this.disableNavigationBlocking}
                    />
                  )}
                </>
              )}
            </Fragment>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentFacility, facilitiesLoading } = state.facilities;

  return {
    isDirty: isDirty('facilityform')(state),
    currentFacility,
    facilitiesLoading,
  };
};

export default connect(mapStateToProps, {
  createFacility,
  fetchFacility,
  updateFacility,
  clearCurrentFacility,
})(FacilityEdit);
