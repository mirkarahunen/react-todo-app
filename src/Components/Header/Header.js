import React, { useContext } from 'react'
import './Header.scss'
import moonIMG from '../../images/icon-moon.svg'
import sunIMG from '../../images/icon-sun.svg'
import { ThemeContext } from '../Context/ThemeContext'


const Header = () => {
    const Theme = useContext(ThemeContext)

    
    return(
        <header className={`${Theme.theme}`}>
            <div className={`header`}>
                <h1>Todo</h1>
                <picture onClick={Theme.changeMode} alt="Mode">
                    <source srcSet={Theme.theme === "Light" ? moonIMG : sunIMG}/>
                    <img src={Theme.theme === "Light" ? moonIMG : sunIMG} alt="Mode"/>
                </picture>
            </div>  
        </header>
    )
}

export default Header
