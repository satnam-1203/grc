import '../App.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../utils/config';

function StuDashSidebar({ onTabChange }) {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            Axios.get(`${API_URL}/logout`).then(res => {
            })
            navigate("/");

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            {/* About section starts here */}
            <div id="sideBarContainer">
                <div id="tab">
                    <p style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => onTabChange("student_dashboard")}>DashBoard</p>
                    <p style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => onTabChange("student_profile")}>Profile</p>
                    <p style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => onTabChange("student_notification")}>Notification</p>
                </div>

                <div id="tab">
                    <p>Courses</p>
                    <ul>
                        <li onClick={() => onTabChange("student_syllabus")}>Syllabus</li>
                        <li onClick={() => onTabChange("student_result")}>Result</li>
                    </ul>
                </div>

                <div id="tab">
                    <p>Exam</p>
                    <ul>
                        <li onClick={() => onTabChange("datesheet")}>Datesheet</li>
                    </ul>
                    <p style={{ marginTop: "20px", cursor: "pointer" }} onClick={logout}>LogOut</p>
                </div>

            </div >

        </>
    );
}
export default StuDashSidebar;