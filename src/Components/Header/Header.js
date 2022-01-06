import React from 'react'
import './Header.scss'
import moonIMG from '../../images/icon-moon.svg'
const Header = () => {
    return(
        <header>
            <div className="header">
                <h1>Todo</h1>
                <img src={moonIMG} alt="Mode"/>
            </div>  
        </header>
    )
}

export default Header
