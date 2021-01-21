import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import FacilitiesList from '../layout/FacilitiesList';
import Spinner from '../layout/Spinner';
import {
  fetchFacilities,
  filterFacilities,
  clearFilteredFacilities,
} from '../../actions/facilities';
import { loadUser } from '../../actions/auth';

const Facilities = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    loadUser,
    currentUser,
    facilities,
    filteredFacilities,
    fetchFacilities,
    filterFacilities,
    facilitiesLoading,
    clearFilteredFacilities,
  } = props;

  useEffect(() => {
    if (!currentUser) loadUser();
    fetchFacilities();
    // eslint-disable-next-line
  }, [currentUser, loadUser]);

  useEffect(() => {
    if (searchTerm) {
      filterFacilities(searchTerm);
    } else {
      clearFilteredFacilities();
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  if (facilities !== null && facilities.length === 0 && !facilitiesLoading) {
    return <h4 className='ui header'>Please add a facility</h4>;
  }

  return (
    <Fragment>
      <Navbar />
      <div className='admin-wrapper'>
        <Sidebar />

        <div className='admin-content'>
          <div className='search-form'>
            <form>
              <div className='ui small icon input'>
                <input
                  type='text'
                  placeholder='Search a facility...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className='search icon'></i>
              </div>
            </form>
            <Link className='ui  primary small button' to='/facilities/new'>
              Add Facility
            </Link>
          </div>

          <Fragment>
            {facilities !== null && !facilitiesLoading ? (
              <TransitionGroup>
                {filteredFacilities ? (
                  <FacilitiesList facilities={filteredFacilities} />
                ) : (
                  <FacilitiesList facilities={facilities} />
                )}
              </TransitionGroup>
            ) : (
              <div className='spinner-wrapper'>
                <Spinner text={'Loading facilities...'} size={'medium'} />
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { currentUser } = state.auth;
  const {
    facilities,
    filteredFacilities,
    facilitiesLoading,
  } = state.facilities;

  return {
    currentUser,
    facilities,
    filteredFacilities,
    facilitiesLoading,
  };
};

export default connect(mapStateToProps, {
  loadUser,
  fetchFacilities,
  filterFacilities,
  clearFilteredFacilities,
})(Facilities);
