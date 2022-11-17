import './login.scss'
import { useContext, useState, useEffect } from "react"
import { DarkModeContext } from '../context/darkModeContext'
import EarbudsIcon from '@mui/icons-material/Earbuds';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"


const Login = () => {
    const [inputs, setInputs] = useState({
        username:"",
        password:""
    })
    const { toggle, darkMode } = useContext(DarkModeContext)

    const navigate = useNavigate()
    const [err, setErr] = useState(null)
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]:e.target.value}))
    }
    const { login } = useContext(AuthContext)
    console.log(inputs)

    const handleLogin = async (e) => {
        try {
            e.preventDefault()
            await login(inputs)
            navigate('/')
        } catch (err) {
            console.log(err)
            setErr(err.response.data)
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
                        <input name="password" type="password" placeholder='password'  onChange={handleChange}/>
                    </div>
                    {err && <span>{err}</span>}
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login