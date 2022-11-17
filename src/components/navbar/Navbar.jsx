import './navbar.scss'
import { useState, useEffect } from 'react' 
import LoginIcon from '@mui/icons-material/Login';
import Brightness4Icon from '@mui/icons-material/Brightness4'; 
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext)

    return (
        <div className='navbar colored'>
            <div className="container">
                <div className="left">
                    <div className="logo">
                        <div>Aggregator GAMING IT</div>
                    </div>
                </div>
                <div className="right">
                    <button className="changeMod" onClick={toggle}>{ darkMode ? <Brightness5Icon /> : <Brightness4Icon />}</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar