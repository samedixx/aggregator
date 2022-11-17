import './login.scss'
import { useContext, useState, useEffect } from "react"
import { DarkModeContext } from '../context/darkModeContext'
import EarbudsIcon from '@mui/icons-material/Earbuds';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Navigate } from 'react-router-dom'

const Login = ({handleLogin}) => {
    const {darkMode} = useContext(DarkModeContext)
    const [user, setUser] = useState({
        username:'',
        password:''
    })
    const [error, setError] = useState(null)
    const [success, setSucces] = useState(null)
    const [loginSuccess, setLoginSuccess] = useState(false)

    const handleChange = (event) => {
        setUser(prev => ({...prev, [event.target.name]:event.target.value}))
    }

    console.log(user)
    const handleClick = (e) => {
        e.preventDefault()
        console.log(user)
        if(user.username !== "admin" && user.password !== "root") {
            setError('Something went wrong')
        } else if ((user.username === "admin" && user.password === "root")) {
            handleLogin(true)
            localStorage.setItem("user", JSON.stringify(user));
            setSucces("Login success!")
            setLoginSuccess(true)
            goToHome()
        } else {
            setError('Something went wrong')
        }
    }

    const goToHome = () => {
        console.log('far from home...')
        if(loginSuccess) {
            return <Navigate to="/" />
        }
    }

    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <div className="login">
                <div className="card_login">
                    <div className="login_title">
                        <span><EarbudsIcon /></span>
                        <span>AGGREGATOR GAMING IT</span>
                    </div>
                    <div className="username">
                        <AccountCircleIcon />
                        <input name="username" type="text" placeholder='username' onChange={handleChange}/>
                    </div>
                    <div className="password">
                        <KeyIcon />
                        <input name="password" type="password" placeholder='password' onChange={handleChange} />
                    </div>
                    { error && <span className="error">{error}</span>}
                    { success && <span className="success">{success}</span>}
                    <button onClick={handleClick} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login