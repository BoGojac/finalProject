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