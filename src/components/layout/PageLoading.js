import React from 'react';

const PageLoading = () => {
  return (
    <div className='page-loading'>
      <div className='ui active dimmer'>
        <div className='ui big text loader'>
          Setting things up. Please wait...
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
