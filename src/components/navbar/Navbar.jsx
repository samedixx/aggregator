import './navbar.scss'
import { useState, useEffect } from 'react' 
import LoginIcon from '@mui/icons-material/Login';
import Brightness4Icon from '@mui/icons-material/Brightness4'; 

const Navbar = () => {

    return (
        <div className='navbar colored'>
            <div className="container">
                <div className="left">
                    <div className="logo">
                        <div>Aggregator GAMING IT</div>
                    </div>
                </div>
                <div className="right">
                    <button className="changeMod"><Brightness4Icon /></button>
                    <div className="form">
                        <input type="text" placeholder='Username' name="username" />
                        <input type="password" placeholder="Password" name="password" />
                        <button><LoginIcon /> LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar