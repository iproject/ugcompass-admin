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
  users,
}) => {
  const getNumberOfUserRole = (role) => {
    let count = 0;
    users.forEach((user) => {
      if (user.role === role) {
        count++;
      }
    });

    return count;
  };

  return (
    <div
      // className='grid ui two column '
      className={`grid ui three column`}
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
                        <div className='inline ui active centered loader'></div>
                      )}
                    </div>
                    <div className='label'>Signees</div>
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
                    <div className='inline ui active centered loader'></div>
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
                    <div className='inline ui active centered loader'></div>
                  )}
                </div>
                <div className='label'>Rooms</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='sixteen wide column'>
        <h4 className='ui header' style={{ marginBottom: '-10px' }}>
          User Roles
        </h4>
      </div>

      <div className='column'>
        <div className='ui inverted segment'>
          <div className='ui inverted horizontal tiny blue statistic'>
            <div className='value'>{getNumberOfUserRole('admin')}</div>
            <div className='label'>Admins</div>
          </div>
        </div>
      </div>
      <div className='column'>
        <div className='ui inverted segment'>
          <div className='ui inverted horizontal tiny blue statistic'>
            <div className='value'>{getNumberOfUserRole('publisher')}</div>
            <div className='label'>Publishers</div>
          </div>
        </div>
      </div>
      <div className='column'>
        <div className='ui inverted segment'>
          <div className='ui inverted horizontal tiny blue statistic'>
            <div className='value'>{getNumberOfUserRole('user')}</div>
            <div className='label'>Users</div>
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
