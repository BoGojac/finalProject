//import React from 'react';
import { Outlet } from 'react-router-dom';

const PollingStationPage = () => {
    return (
        <div className="flex h-screen">
          <h2 className="text-2xl font-bold mb-6">Polling-Station Dashboard</h2>
          <Outlet/>
      </div>
    );
}

export default PollingStationPage;
