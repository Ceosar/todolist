import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Auth from './Components/Auth/Auth.jsx'
import ThemeSwitcher from './Components/ThemeSwitcher/ThemeSwitcher.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Zad from './Components/Main/Zad/Zad.jsx';
import CreateTexCart from "./Components/Main/CreatTask/CteateTask.jsx"


const routers = createBrowserRouter([
  {
    path: "/*",
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
      // {
      //   path: "loggin",
      //   element: <Auth />,
      // }
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>,
)




