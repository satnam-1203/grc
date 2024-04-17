import '../App.css';
import React from "react";
import { useLocation, Link } from 'react-router-dom';
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";

function EnrollmentStatus() {
    const location = useLocation();
    const studentId = location.state ? location.state.studentId : null;
    const pass = location.state ? location.state.pass : null;

    return (
        <>
            <TopHeader></TopHeader>
            <Navigation></Navigation>

            {/* About section starts here */}
            <div id="PageContainer">
                <div id="enrollSection">
                    <p id="pageTitle">Notice</p>

                    <p id="notice">Your account registration is successful. Your ID ({studentId}) and password ({pass}) have been generated. 
                    Please await approval from the college management. Once approved, you can proceed to pay the fee within two days.</p>

                    <Link id="linkBtn" to="/student-dash">Go to Dashboard</Link>
                </div>
            </div>

            {/* footer section starts here */}
            <Footer />

        </>
    );
}
export default EnrollmentStatus;