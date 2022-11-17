import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import "./style.scss"
import { useContext,  useState, useEffect } from "react"
import { DarkModeContext } from "./context/darkModeContext"
import Navbar from "./components/navbar/Navbar"
import Login from "./pages/Login"
import Casino from "./pages/Casino"

function App() {

  const {darkMode} = useContext(DarkModeContext)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );


  const ProtectedRoute = ({children}) => {
    console.log('protected route check ', currentUser)
    if(currentUser === null){
      return <Navigate to="/login" />
    }
    return children
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

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

  console.log(currentUser, 'check current user')

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
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/casino',
      element: <Casino />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
