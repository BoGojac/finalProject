//import React from 'react';
import {Outlet }from "react-router-dom";

const BoardManagersPage = () => {
    return (
        <>
        <h2 className="text-2xl font-bold mb-6">BoardManager Dashboard</h2>
        <Outlet/>
        </>
    );
}

export default BoardManagersPage;
