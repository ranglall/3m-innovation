import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Make sure the path is correct
import Home from './pages/Home';
import AirQuality from './pages/AirQuality';
import OurStory from './pages/OurStory';
import Team from './pages/Team';

function App() {
  return (
  <Router>
  <Navbar />
  <div className="page-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AirQuality" element={<AirQuality />} />
      <Route path="/OurStory" element={<OurStory />} />
      <Route path="/Team" element={<Team />} />
    </Routes>
  </div>
</Router>

  );
}

export default App;
