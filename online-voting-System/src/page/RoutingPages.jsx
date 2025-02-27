import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; // Your HomePage component
import LoginPage from "./LoginPage"; // Your LoginPage component

const RoutingPages = () => {
    return (
        <div>
             <Router>
                <Routes>
                    {/* Home Page Route */}
                    <Route path="/" element={<HomePage />} />

                    {/* Login Page Route */}
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default RoutingPages;
