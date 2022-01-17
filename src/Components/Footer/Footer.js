import React, { useContext } from 'react'
import './Footer.scss'
import { ThemeContext } from '../Context/ThemeContext'

const Footer = () => {
    const Theme = useContext(ThemeContext)

    return (
        <section>
            <div className={`footer ${Theme.theme}`}>
                <span>
                    Drag and Drop to reorder the list
                </span>
            </div>
        </section>
    )

}

export default Footer