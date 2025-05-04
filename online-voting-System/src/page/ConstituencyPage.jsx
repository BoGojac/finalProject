//import React from 'react';
import { Outlet } from 'react-router-dom';

const ConstituencyPage = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Constituency Dashboard</h2>
            <Outlet/>
        </>
    );
}

export default ConstituencyPage;
