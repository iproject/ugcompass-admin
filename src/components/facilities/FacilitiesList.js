import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { deleteFacility } from '../../actions/facilities';

const FacilitiesList = ({ facilities, facilitiesLoading, deleteFacility }) => {
  return (
    <div className='ui relaxed divided list facilities-list'>
      {facilities &&
        facilities.map((facility) => (
          <CSSTransition key={facility._id} timeout={500} classNames='item'>
            <div className='item'>
              <div className='content'>
                <Link className='header' to={`/facilities/${facility._id}`}>
                  {facility.name} |{' '}
                  <span className='user-role'>{facility.category}</span>
                </Link>
                <div className='description'>
                  <div className='wrapper'>
                    <div className='text'>{facility.description}</div>
                    <div className='controls'>
                      <Link
                        style={{ marginRight: '.75rem' }}
                        to={`/facilities/${facility._id}/edit`}
                      >
                        <i className='icon fa-edit'></i>
                      </Link>

                      {!facilitiesLoading ? (
                        <a
                          href='#!'
                          onClick={() => deleteFacility(facility._id)}
                        >
                          <i className='icon fa-trash-alt'></i>
                        </a>
                      ) : (
                        <div class='ui active tiny inline loader'></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    facilityLoading: state.facilities.facilityLoading,
  };
};

export default connect(mapStateToProps, { deleteFacility })(FacilitiesList);
