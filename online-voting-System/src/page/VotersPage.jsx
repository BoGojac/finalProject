//import React from 'react';
import { Outlet } from 'react-router-dom';

const VotersPage = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Voters Dashboard</h2>
            <Outlet/>
        </>
    );
}

export default VotersPage;
