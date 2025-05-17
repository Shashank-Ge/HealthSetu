import React from 'react';
import { useTheme } from './ThemeContext';

import './theme.css';

const ToggleMode = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <span className="theme-toggle-label">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={toggleTheme} 
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleMode;