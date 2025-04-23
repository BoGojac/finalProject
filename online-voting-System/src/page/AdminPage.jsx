// import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {

  return (
    <>
     <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
    <Outlet/>
    </>
  );
};

export default AdminPage;
