import React, { useState ,useEffect } from 'react';
import { BsFillMoonStarsFill , BsSun } from 'react-icons/Bs'
import './ThemeSwitcher.scss';

const ThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleThemeToggle = (parms) => {
    

    const root = document.documentElement;
    root.className = parms ? "dark" : "light";
    root.style.setProperty('--background-color', isDarkTheme ? '#f0f0f0' : '#333');
    root.style.setProperty('--text-color', isDarkTheme ? '#333' : '#f0f0f0');

    setIsDarkTheme(parms);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.className = isDarkTheme ? "dark" : "light";
    root.style.setProperty('--background-color', isDarkTheme ? '#333' : '#f0f0f0');
    root.style.setProperty('--text-color', isDarkTheme ? '#f0f0f0' : '#333');
  },[]);

  return (
    <div className={`theme-switcher ${isDarkTheme ? 'dark' : 'light'}`}>
        {isDarkTheme && (
        <div className={"sun"} onClick={() => handleThemeToggle(false)}>
            <BsSun className="icon" />
        </div>
        )}
        {!isDarkTheme && (
        <div className={"moon"} onClick={() => handleThemeToggle(true)}>
            <BsFillMoonStarsFill className="icon" />
        </div>
        )}
    </div>
  );
};

export default ThemeSwitcher;