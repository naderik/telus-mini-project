import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Chart1 from './pages/Chart1';
import Chart2 from './pages/Chart2';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart1" element={<Chart1 />} />
          <Route path="/chart2" element={<Chart2 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;