import React from 'react';
import Navbar from '../layout/MainNavbar';
import Sidebar from '../layout/LeftSidebar';

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className='admin-wrapper'>
        <Sidebar />
        <div className='admin-content'>
          <p>You are welcome!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
