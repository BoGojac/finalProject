import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../component/Header.jsx";
import Hero from "../component/Hero";
import HowItWorks from "../component/HowItWorks";
import QuickActions from "../component/QuickActions";
import About from "../component/About.jsx";
import Footer from "../component/Footer";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-100 text-gray-900">
        <Header />
        <Hero />
        <HowItWorks />
        <QuickActions />
        <About/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;





































// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import NavBar from '../component/navBar'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <NavBar/>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
