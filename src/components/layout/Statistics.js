import React, { Fragment } from 'react';
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
  facilities,
  rooms,
}) => {
  const categories = [
    { name: 'Study', type: 'study' },
    { name: 'Classroom', type: 'classroom' },
    { name: 'General Use', type: 'general_use' },
    { name: 'Laboratory', type: 'laboratory' },
    { name: 'Office', type: 'office' },
    { name: 'Residential', type: 'residential' },
    { name: 'Special Use', type: 'special_use' },
    { name: 'Leased', type: 'leased' },
    { name: 'Support', type: 'support' },
    { name: 'Other', type: 'other' },
  ];

  const getNumberOfUserRole = (role) => {
    let count = 0;
    if (users) {
      users.forEach((user) => {
        if (user.role === role) {
          count++;
        }
      });
    }
    return count;
  };

  const getNumberOfCategory = (category) => {
    let count = 0;
    if (users) {
      facilities.forEach((facility) => {
        if (facility.category === category) {
          count++;
        }
      });

      rooms.forEach((room) => {
        if (room.category === category) {
          count++;
        }
      });
    }
    return count;
  };

  return (
    <Fragment>
      <div
        className={`grid stackable ui ${
          currentUser.role === 'admin' ? 'three' : 'two'
        } column wide`}
      >
        {currentUser.role === 'admin' && (
          <div className='column'>
            <div className='ui card fluid'>
              <div className='content'>
                <i className='right floated users teal icon large'></i>
                <div className='header'>
                  <div className='ui statistic small'>
                    <div className='value'>
                      {!usersLoading ? (
                        numberOfUsers
                      ) : (
                        <div className='inline ui active centered loader'></div>
                      )}
                    </div>
                    <div className='label'>Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='column'>
          <div className='ui card fluid'>
            <div className='content'>
              <i className='right floated building teal icon large'></i>
              <div className='header'>
                <div
                  className={`ui ${
                    currentUser.role !== 'admin' && 'horizontal'
                  } statistic small`}
                >
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
          <div className='ui card fluid'>
            <div className='content'>
              <i className='right floated warehouse teal icon large'></i>
              <div className='header'>
                <div
                  className={`ui ${
                    currentUser.role !== 'admin' && 'horizontal'
                  } statistic small`}
                >
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

        {currentUser.role === 'admin' && (
          <Fragment>
            <div className='sixteen wide column'>
              <h4 className='ui header' style={{ marginBottom: '-15px' }}>
                User Roles
              </h4>
            </div>

            <div className='column'>
              <div className='ui inverted segment'>
                <div className='ui inverted horizontal tiny teal statistic'>
                  <div className='value'>{getNumberOfUserRole('admin')}</div>
                  <div className='label'>Admin</div>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='ui inverted segment'>
                <div className='ui inverted horizontal tiny teal statistic'>
                  <div className='value'>
                    {getNumberOfUserRole('publisher')}
                  </div>
                  <div className='label'>Publisher</div>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='ui inverted segment'>
                <div className='ui inverted horizontal tiny teal statistic'>
                  <div className='value'>{getNumberOfUserRole('user')}</div>
                  <div className='label'>User</div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
      <div className='ui segment' style={{ marginTop: '2rem' }}>
        <h4 className='header'>Categories</h4>
        <div className='ui grid'>
          <div className='doubling ten column row'>
            {categories.map((category) => {
              return (
                <div key={category.type} className='column'>
                  <div className='ui center aligned secondary segment'>
                    <span style={{ fontWeight: 'bold', marginRight: '.5rem' }}>
                      {category.name}
                    </span>{' '}
                    <span className='ui teal circular label'>
                      {getNumberOfCategory(category.type)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
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
