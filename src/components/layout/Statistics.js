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
            <div class='ui card'>
              <div class='content'>
                <i class='right floated users icon'></i>
                <div class='header'>
                  <div class='ui statistic small'>
                    <div class='value'>
                      {!usersLoading ? (
                        numberOfUsers
                      ) : (
                        <div class='ui active centered inline loader'></div>
                      )}
                    </div>
                    <div class='label'>Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null)}

      <div className='column'>
        <div class='ui card'>
          <div class='content'>
            <i class='right floated building icon'></i>
            <div class='header'>
              <div class='ui statistic small'>
                <div class='value'>
                  {!facilitiesLoading ? (
                    numberOfFacilities
                  ) : (
                    <div class='ui active centered inline loader'></div>
                  )}
                </div>
                <div class='label'>Facilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='column'>
        <div class='ui card'>
          <div class='content'>
            <i class='right floated warehouse icon'></i>
            <div class='header'>
              <div class='ui statistic small'>
                <div class='value'>
                  {!roomsLoading ? (
                    numberOfRooms
                  ) : (
                    <div class='ui active centered inline loader'></div>
                  )}
                </div>
                <div class='label'>Rooms</div>
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
  numberOfFacilities: PropTypes.bool.isRequired,
  numberOfRooms: PropTypes.bool.isRequired,
  numberOfUsers: PropTypes.bool.isRequired,
};

export default Statistics;
