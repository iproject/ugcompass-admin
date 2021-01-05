import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/MainNavbar';

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className='admin-wrapper'>
        <div className='left-sidebar'>
          <ul>
            <li>
              <Link to='publisher.html'>Publishers</Link>
            </li>
            <li>
              <Link to='facility.html'>Facilities</Link>
            </li>
            <li>
              <Link to='room.html'>Rooms</Link>
            </li>
          </ul>
        </div>
        <div className='admin-content'>
          <p>You are welcome!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
