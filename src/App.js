import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom'
import "./style.scss"
import { useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext"
import Navbar from "./components/navbar/Navbar"

function App() {

  const {darkMode} = useContext(DarkModeContext)

  const Layout = () => {
    return (
      
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{display:'flex'}}>
              <Outlet />
          </div>
        </div>
    )
  }


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path:"/",
          element:<Home />
        },
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
