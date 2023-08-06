import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import { useState, useEffect, useContext } from 'react'
import Auth from './Components/Auth/Auth.jsx'
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "./App.scss"

function App() {

  const [loggin, setLoggin] = useState(false);


  let navigate = useNavigate();

  useEffect(() => {
    let locLoggin = localStorage.getItem('loggin')

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
      <>
        <Header setLoggin={setLoggin} />
        <Main />
      </>
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
