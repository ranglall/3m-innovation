import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Make sure the path is correct
import Home from './pages/Home';
import About from './pages/About';
import AirQuality from './pages/AirQuality';

function App() {
  return (
    <Router>
  <Navbar />
  <div className="page-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/airquality" element={<AirQuality />} />
    </Routes>
  </div>
</Router>

  );
}

export default App;
