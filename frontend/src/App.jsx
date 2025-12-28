import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import WorkProcess from './components/WorkProcess';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://portfolio-backend-farouk.onrender.com';

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Banner />
      <Services />
      <About />
      <WorkProcess />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;