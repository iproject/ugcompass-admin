import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import { fetchFacilities } from '../../actions/facilities';

const Facilities = ({ fetchFacilities, facilities }) => {
  useEffect(() => {
    fetchFacilities();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className='admin-wrapper'>
        <Sidebar />

        <div className='admin-content'>
          <div className='top-section'>
            <div className='search section'>
              <form>
                <input
                  type='text'
                  name='search-term'
                  className='search-input'
                  placeholder='search...'
                />
              </form>
            </div>
            &nbsp;
            <button className='btn'>
              <Link to='/facilities/new'>Add Facility</Link>
            </button>
          </div>
          <br />
          <div className='main-section'>
            {facilities &&
              facilities.map((facility) => (
                <div key={facility._id} className='admin-btn'>
                  <p>
                    {facility.name} |{' '}
                    <span className='user-role'>{facility.category}</span>
                  </p>
                  <div className='controls'>
                    <Link to='/facilities/edit'>
                      <i className='fas fa-edit'></i>
                    </Link>
                    <Link to='/facilities/delete'>
                      <i className='fas fa-trash-alt'></i>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities.facilities,
  };
};

export default connect(mapStateToProps, { fetchFacilities })(Facilities);
