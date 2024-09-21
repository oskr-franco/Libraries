import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';

import * as styles from './App.module.scss';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <div className={styles.mainContent}>
          <Sidebar />
          <div className={styles.contentArea}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} /> */}
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
