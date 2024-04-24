//Naviagtion.jsx

import '../App.css';
import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
    const [showMenu, setShowMenu] = React.useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            {/* navigation bar starts here */}
            <div id="navbar">
                <div className='logo'>GRC Online Portal</div>
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={showMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <div id="showMenu">
                    <div id='navMenu' className={showMenu ? 'show' : ''}>
                        <ul>
                            <li><Link className="link" to="/home">Home</Link></li>
                            <li><Link className="link" to="/courses">Courses</Link></li>
                            <li><Link className="link" to="/about">About</Link></li>
                            <li><Link className="link" to="/Contact">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* nav bar ends here */}
        </>
    );
}

export default Navigation;
