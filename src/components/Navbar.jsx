import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const NAVIGATION_ITEMS = [
  { path: '/', label: '🏠 Home', end: true },
  { path: '/chat', label: '🤖 AI Chatbot' },
  { path: '/image-to-text', label: '📷 Image to Text' },
  { path: '/text-to-speech', label: '🔊 Text to Speech' },
  { path: '/voice-to-text', label: '🎤 Voice to Text' },
  { path: '/text-to-img', label: '🎨 Text to Image' },
  // Hidden for now - keep routes but don't show in menu
  // { path: '/model', label: '⚡ AI Models' },
  // { path: '/open-router', label: '🔗 OpenRouter' },
];

function Navbar() {
  // Initialize sidebar as open on desktop (window width >= 769px)
  const [toggle, setToggle] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 769;
    }
    return false;
  });

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  // Handle window resize to auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add/remove class to body based on sidebar state for desktop styling
  useEffect(() => {
    if (toggle) {
      document.body.classList.add('sidebar-open');
      document.body.classList.remove('sidebar-closed');
    } else {
      document.body.classList.add('sidebar-closed');
      document.body.classList.remove('sidebar-open');
    }
  }, [toggle]);

  return (
    <>
      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${toggle ? 'active' : ''}`} 
        onClick={toggleSidebar}
        aria-hidden="true"
      />
      
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className={`menu-toggle ${toggle ? 'hidden' : ''}`}
        aria-label="Toggle navigation menu"
        aria-expanded={toggle}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${toggle ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="sidebar-header">
          <h2 className="navbar-brand">MultiGen AI</h2>
          <button
            onClick={toggleSidebar}
            className="sidebar-close"
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  end={item.end}
                  aria-current={({isActive}) => isActive ? 'page' : undefined}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;
