import React from 'react';
import { useTheme } from './ThemeContext';

import './theme.css';

const ToggleMode = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container nav-toggle">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={toggleTheme} 
          aria-label="Toggle dark mode"
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleMode;