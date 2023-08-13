import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.scss';

import moon from "./../../assets/moon.svg"
import sun from "./../../assets/sun.svg"

const ThemeSwitcher = ({ event }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleThemeToggle = (parms) => {
    const root = document.documentElement;
    root.className = parms ? "dark" : "light";
    root.style.setProperty('--background-color', parms ? 'rgba(136, 136, 136, 0.6)' : 'rgba(231, 231, 231, 0.6)');
    root.style.setProperty('--text-color', parms ? '#f3f3f3' : '#2b2b2b');
    setIsDarkTheme(parms);
    console.log(123)
    root.style.setProperty('--back-images', parms ? 'url(/src/assets/background_tasks_black.jpg)' : 'url(/src/assets/background_tasks_light.jpg)');
    if (parms) {
      localStorage.setItem('app-theme', 'dark');
      // root.style.setProperty('--back-images', );
      // console.log('dark')
    } else {
      localStorage.setItem('app-theme', 'light');
      // console.log('light')
      // root.style.setProperty('--back-images', );
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
    root.style.setProperty('--background-color', LocThemm == "dark" || LocThemm == undefined ? 'rgba(136, 136, 136, 0.6)' : 'rgba(231, 231, 231, 0.6)');
    root.style.setProperty('--text-color', LocThemm == "dark" || LocThemm == undefined ? '#f3f3f3' : '#2b2b2b');
    root.style.setProperty('--back-images', LocThemm == "dark" || LocThemm == undefined? 'url(/src/assets/background_tasks_black.jpg)' : 'url(/src/assets/background_tasks_light.jpg)');
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
