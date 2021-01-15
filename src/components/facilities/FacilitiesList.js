import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { deleteFacility } from '../../actions/facilities';

const FacilitiesList = ({ facilities, facilitiesLoading, deleteFacility }) => {
  const onDeleteFacility = (facility) => {
    const shouldDeleteFacility = window.confirm(
      `Are you sure you want to delete ${facility.name}`
    );

    if (shouldDeleteFacility) {
      deleteFacility(facility._id);
    }
  };

  return (
    <div className='ui relaxed divided list facilities-list'>
      {facilities &&
        facilities.map((facility) => (
          <CSSTransition key={facility._id} timeout={500} classNames='item'>
            <div className='item'>
              <div className='content'>
                <Link
                  className='header'
                  to={`/facilities/${facility._id}/edit`}
                >
                  {facility.name} |{' '}
                  <span className='user-role'>{facility.category}</span>
                </Link>
                <div className='description'>
                  <div className='wrapper'>
                    <div className='text'>{facility.description}</div>
                    <div className='controls'>
                      {!facilitiesLoading ? (
                        <a href='#!' onClick={() => onDeleteFacility(facility)}>
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
