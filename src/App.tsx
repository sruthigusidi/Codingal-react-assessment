

import React from 'react';
import Navbar from './components/Navbar';
import './assets/styles/index.css';
import PostsPage from './pages/PostsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
