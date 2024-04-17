import '../App.css';
import React from "react";

function Footer() {
    return (
        <>
            {/* footer section starts here */}
            <div id="footer">
                <div id="mainFooter">
                    <div id="footerLinks">
                        <p style={{ fontSize: "25px" }}>Important Links</p>
                        <p>Courses</p>
                        <p>Registration</p>
                        <p>Important Notice</p>
                        <p>Examination</p>
                    </div>

                    <div id="footerCourse">
                        <p style={{ fontSize: "25px" }}>Courses</p>
                        <p>PG Courses</p>
                        <p>UG Courses</p>
                        <p>Diploma Courses</p>
                    </div>
                </div>

                <div id="footerCopyright">Copyright <sup>&copy;</sup> All rights reserved. {new Date().getFullYear()}</div>
            </div>
            {/* footer section ends here */}
        </>
    );
}

export default Footer;