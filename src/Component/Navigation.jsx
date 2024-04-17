import '../App.css';
import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <>
            {/* navigation bar starts here */}
            <div id="navbar">
                <div className='logo'>GRC Online Portal</div>
                <div id='navMenu'>
                    <ul>
                        <li><Link className="link" to="/home">Home</Link></li>
                        <li><Link className="link" to="/courses">Courses</Link></li>
                        <li><Link className="link" to="/about">About</Link></li>
                        <li><Link className="link" to="/Contact">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
            {/* nav bar ends here */}
        </>
    );
}

export default Navigation;