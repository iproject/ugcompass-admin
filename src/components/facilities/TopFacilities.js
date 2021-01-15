import React, { Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { Rating } from 'semantic-ui-react';

const TopFacilities = ({ topFacilities, facilitiesLoading }) => {
  const renderTopFacilities = () => {
    console.log(topFacilities);
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
        <div className={`ui clearing ${position} attached segment`}>
          {facility.name}

          <div class='ui right floated basic tiny button'>
            <Rating
              icon='star'
              rating={Math.ceil(facility.averageRating / 2)}
              maxRating={5}
            />
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
          <Spinner padding={4} text='Loading top facilities...' />
        </div>
      )}
    </Fragment>
  );
};

export default TopFacilities;
