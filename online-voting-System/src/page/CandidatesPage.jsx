//import React from 'react';
import { Outlet } from 'react-router-dom';

const CandidatesPage = () => {
    return (
        <>
          {/* <h2 className="text-2xl font-bold mb-6">Candidates Dashboard</h2> */}
          <Outlet/>
      </>
    );
}

export default CandidatesPage;
