import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import { useState, useEffect, useContext } from 'react'
import Auth from './Components/Auth/Auth.jsx'
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "./App.scss"
import MenuBar from './Components/MenuBar/MenuBar';

function App() {
  const [theme, setTheme] = useState('');
  const [backImage, setBackImage] = useState();
  const [loggin, setLoggin] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setTheme(document.documentElement.className);
    console.log(theme)
  }, [])

  // useEffect(() => {
  //   if (theme == 'light') {
  //     setBackImage(theme);
  //   }
  //   else {
  //     setBackImage(theme);
  //   }
  // }, [theme])

  useEffect(() => {
    let locLoggin = localStorage.getItem('loggin');
console.log(theme)
    if (locLoggin == null || locLoggin == false) {
      setLoggin(false);
    } else {
      setLoggin(true);
    }
    if (!loggin) { navigate("/loggin/") }
  }, [])

  useEffect(() => {
    let locLoggin = localStorage.getItem('loggin')

    if (locLoggin == null || locLoggin == false) {
      setLoggin(false);
    } else {
      setLoggin(true);
    }
    if (!loggin) { navigate("/loggin/") }
  }, [loggin])

  if (loggin) {
    return (
      <div className='main-body'>
        <Header setLoggin={setLoggin} />
        <div className='todo_menu'>
          <MenuBar />
          <Main />
        </div>
      </div>
    )
  } else {

    return (
      <>
        <Auth setLoggin={setLoggin} />
      </>
    )

  }
}

export default App
