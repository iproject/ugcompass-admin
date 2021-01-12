import React from 'react';
import PropTypes from 'prop-types';

const Statistics = ({
  currentUser,
  facilitiesLoading,
  roomsLoading,
  usersLoading,
  numberOfFacilities,
  numberOfUsers,
  numberOfRooms,
}) => {
  return (
    <div
      // className='grid ui two column '
      className={`grid ui ${
        currentUser.role === 'admin' ? 'three' : 'two'
      } column`}
    >
      {currentUser &&
        (currentUser.role === 'admin' ? (
          <div className='column'>
            <div className='ui card'>
              <div className='content'>
                <i className='right floated users icon'></i>
                <div className='header'>
                  <div className='ui statistic small'>
                    <div className='value'>
                      {!usersLoading ? (
                        numberOfUsers
                      ) : (
                        <div className='ui active centered inline loader'></div>
                      )}
                    </div>
                    <div className='label'>Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null)}

      <div className='column'>
        <div className='ui card'>
          <div className='content'>
            <i className='right floated building icon'></i>
            <div className='header'>
              <div className='ui statistic small'>
                <div className='value'>
                  {!facilitiesLoading ? (
                    numberOfFacilities
                  ) : (
                    <div className='ui active centered inline loader'></div>
                  )}
                </div>
                <div className='label'>Facilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='column'>
        <div className='ui card'>
          <div className='content'>
            <i className='right floated warehouse icon'></i>
            <div className='header'>
              <div className='ui statistic small'>
                <div className='value'>
                  {!roomsLoading ? (
                    numberOfRooms
                  ) : (
                    <div className='ui active centered inline loader'></div>
                  )}
                </div>
                <div className='label'>Rooms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Statistics.propTypes = {
  currentUser: PropTypes.object.isRequired,
  facilitiesLoading: PropTypes.bool.isRequired,
  roomsLoading: PropTypes.bool.isRequired,
  usersLoading: PropTypes.bool.isRequired,
  numberOfFacilities: PropTypes.number.isRequired,
  numberOfRooms: PropTypes.number.isRequired,
  numberOfUsers: PropTypes.number.isRequired,
};

export default Statistics;
