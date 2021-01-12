import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditFacilityDetail from '../forms/EditFacilityDetail';
import EditFacilityPhotos from '../forms/EditFacilityPhotos';
import EditFacilityWorkingHours from '../forms/EditFacilityWorkingHours';
import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import { createFacility } from '../../actions/facilities';

class FacilityCreate extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  // On wizard form submission
  onSubmit = (formValues) => {
    this.props.createFacility(formValues);
  };

  render() {
    const { page } = this.state;
    return (
      <Fragment>
        <Navbar />
        <div className='admin-wrapper'>
          <Sidebar />
          <div className='admin-content'>
            <Link
              className='ui left labeled tiny icon button '
              style={{ marginTop: '-2rem', marginBottom: '1rem' }}
              type='button'
              to='/facilities'
            >
              <i className='left arrow icon'></i>
              Back To List
            </Link>{' '}
            {page === 1 && <EditFacilityDetail onSubmit={this.nextPage} />}
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
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { createFacility })(FacilityCreate);
