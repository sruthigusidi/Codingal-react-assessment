import React, { useState } from 'react';
import Timer from './Timer';
import EndClassModal from './EndClassModal';
import logo from '../assets/images/logo.png';
import logo_only from '../assets/images/logo_only.png';
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(true); 
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEndClassClick = () => {
    setModalOpen(true);
    setTimerActive(false); 
  };

  const handleConfirmEndClass = () => {
    setTimerActive(false);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setTimerActive(true);
    setModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
        <Link to="/" className='logo-link'>
          <img src={logo_only} alt="Codingal Logo" className="navbar-logo" style = {{ padding: "3px 15px 3px 3px" }} />
          <img src={logo} alt="Codingal Logo" className="navbar-mobile-logo" />
          </Link>
        
          <span className="navbar-desktop-lesson">Trial Lesson [Grade 1-3]</span>
          <span className="navbar-mobile-brand"></span>
        </div>

        <div className="navbar-right">
          <div
            className="navbar-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/posts" className="navbar-link">Posts</Link>
            <Timer isActive={timerActive} />
            <button className="end-class-btn" onClick={handleEndClassClick}>
              End class
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EndClassModal
        isOpen={modalOpen}
        onConfirm={handleConfirmEndClass}
        onCancel={handleCancel}
      />    
    </nav>
    
  );
};

export default Navbar;
