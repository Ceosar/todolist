import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.scss';

import moon from "./../../assets/moon.svg"
import sun from "./../../assets/sun.svg"

const ThemeSwitcher = ({ event }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleThemeToggle = (parms) => {
    const root = document.documentElement;
    root.className = parms ? "dark" : "light";
    root.style.setProperty('--background-color', isDarkTheme ? '#f0f0f0' : '#333');
    root.style.setProperty('--text-color', isDarkTheme ? '#333' : '#f0f0f0');

    setIsDarkTheme(parms);

    if (parms) {
      localStorage.setItem('app-theme', 'dark');
    } else {
      localStorage.setItem('app-theme', 'light');
    }

    if (event) {
      event()
    }
  };

  useEffect(() => {
    const LocThemm = localStorage.getItem('app-theme');

    if (LocThemm == "dark") {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }

    const root = document.documentElement;

    root.className = LocThemm == "dark" || LocThemm == undefined ? "dark" : "light";
    root.style.setProperty('--background-color', LocThemm == "dark" || LocThemm == undefined ? '#333' : '#f0f0f0');
    root.style.setProperty('--text-color', LocThemm == "dark" || LocThemm == undefined ? '#f0f0f0' : '#333');
  }, []);

  return (
    <div className={`theme-switcher ${isDarkTheme ? 'dark' : 'light'}`} onClick={() => handleThemeToggle(!isDarkTheme)}>
      <div className={`theme ${isDarkTheme ? 'sun' : 'moon'}`} >
        {isDarkTheme ? (
          <img src={sun} alt="" />
        ) : (
          <img src={moon} />
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
