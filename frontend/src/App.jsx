import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import WorkProcess from './components/WorkProcess';

export const backendUrl = 'http://localhost:4000';

function App() {
  return (
    <div className="App">
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