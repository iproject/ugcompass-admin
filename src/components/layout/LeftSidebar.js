import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <ul>
        <li>
          <Link to='/users'>Users</Link>
        </li>
        <li>
          <Link to='/facilities'>Facilities</Link>
        </li>
        <li>
          <Link to='/rooms'>Rooms</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
