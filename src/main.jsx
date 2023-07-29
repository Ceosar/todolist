import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThemeSwitcher from './Components/ThemeSwitcher/ThemeSwitcher.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Zad from './Components/Main/Zad/Zad.jsx';
import CreateTexCart from "./Components/Main/CreateTexCart/CteateTexCart.jsx"


const userLogin = true


const routerLoginTrue = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "zad",
        element: <Zad />,
      },
      {
        path: "add",
        element: <CreateTexCart />,
      },
      {
        path: "texCarts",
        element: <h1>Tex Carts</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "zad",
        element: <Zad />,
      },
      {
        path: "add",
        element: <h1>Addd</h1>,
      },
      {
        path: "texCarts",
        element: <h1>Tex Carts</h1>,
      },
    ],
  },

]);

const routerLoginFalse = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "zad",
        element: <Zad />,
      },
      {
        path: "add",
        element: <h1>Addd</h1>,
      },
      {
        path: "texCarts",
        element: <h1>Tex Carts</h1>,
      },
    ],
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeSwitcher />
    <RouterProvider router={userLogin ? routerLoginTrue : routerLoginFalse} />
  </React.StrictMode>,
)
