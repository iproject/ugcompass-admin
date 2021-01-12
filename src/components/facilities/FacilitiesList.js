import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const FacilitiesList = ({ facilities }) => {
  return (
    <div className='ui relaxed divided list facilities-list'>
      {facilities &&
        facilities.map((facility) => (
          <CSSTransition key={facility._id} timeout={500} classNames='item'>
            <div className='item'>
              <div className='content'>
                <Link className='header' to='/facilities/edit'>
                  {facility.name} |{' '}
                  <span className='user-role'>{facility.category}</span>
                </Link>
                <div className='description'>
                  <div className='wrapper'>
                    <div className='text'>{facility.description}</div>
                    <div className='controls'>
                      <Link to='/facilities/edit'>
                        <i className='icon fa-edit'></i>
                      </Link>
                      <Link
                        to='/facilities/delete'
                        style={{ marginLeft: '.75rem' }}
                      >
                        <i className='icon fa-trash-alt'></i>
                      </Link>
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

export default FacilitiesList;
