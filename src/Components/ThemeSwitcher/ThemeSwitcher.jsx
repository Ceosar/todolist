import React, { useState, useEffect } from 'react';
import { BsFillMoonStarsFill, BsSun } from 'react-icons/Bs'
import './ThemeSwitcher.scss';

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

  // const handleThemeToggle = (parms) => {
  //   const root = document.documentElement;


  //   root.className = parms ? 'dark' : 'light';
  //   root.style.setProperty('--background-color', parms ? '#f0f0f0' : '#333');
  //   root.style.setProperty('--text-color', parms ? '#333' : '#f0f0f0');
  //   setIsDarkTheme(parms);
  // };


  useEffect(() => {

    const LocThemm = localStorage.getItem('app-theme');



    if (LocThemm == "dark") {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }

    const root = document.documentElement;

    root.className = LocThemm == "dark" || LocThemm == undefined ? "dark" : "light";
    root.style.setProperty('--background-color', LocThemm == "dark" || LocThemm == undefined ? '#333' : '#f0f0f0' );
    root.style.setProperty('--text-color', LocThemm == "dark" || LocThemm == undefined ? '#f0f0f0' :  '#333');
  }, []);

  return (
    <div className={`theme-switcher ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className={`theme ${isDarkTheme ? 'sun' : 'moon'}`} onClick={() => handleThemeToggle(!isDarkTheme)} >
        {isDarkTheme ? (
          <BsSun className="icon" />
        ) : (
          <BsFillMoonStarsFill className="icon" />
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
