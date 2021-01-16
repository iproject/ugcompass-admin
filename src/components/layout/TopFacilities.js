import React, { Fragment } from 'react';
import Spinner from './Spinner';
import { Rating } from 'semantic-ui-react';

const TopFacilities = ({ topFacilities, facilitiesLoading }) => {
  const renderTopFacilities = () => {
    return topFacilities.map((facility, index) => {
      let position;
      if (index === 0) {
        position = 'top';
      } else if (index === topFacilities.length - 1) {
        position = 'bottom';
      } else {
        position = '';
      }

      return (
        <div key={index} className={`ui clearing ${position} attached segment`}>
          {facility.name}

          <div
            className='ui right floated basic tiny button'
            style={ratingButtonStyle}
          >
            <span
              style={{
                fontWeight: 'bold',
                marginRight: '0.25rem',
              }}
            >
              Rating:{' '}
            </span>
            <Rating
              icon='star'
              rating={Math.ceil(facility.averageRating / 2)}
              maxRating={5}
              disabled
            />
            <span style={{ marginLeft: '.5rem', fontWeight: 'bold' }}>
              {Math.ceil(facility.averageRating / 2)}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <h4 className='ui header'>Top Facilities</h4>

      {topFacilities && !facilitiesLoading ? (
        renderTopFacilities()
      ) : (
        <div className='ui segment'>
          <Spinner padding='4' text='Loading top facilities...' />
        </div>
      )}
    </Fragment>
  );
};

const ratingButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'auto',
};

export default TopFacilities;
