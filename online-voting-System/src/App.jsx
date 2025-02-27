// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";

// import "./index.css";

// function App() {
//   return (
//     <Router>
//       <div className="font-sans bg-gray-100 text-gray-900">
       
//       </div>
//     </Router>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage"; // Your HomePage component
import LoginPage from "./page/LoginPage"; // Your LoginPage component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />

        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;