import React, { useState, useEffect } from 'react';
import "../App.css";
import Axios from "axios";
import courseMapping from '../utils/Course';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../Images/profile-icon.jpg';
import { API_URL } from '../utils/config';

function StudentDash() {
    const [studentDetails, setStudentDetails] = useState([]);
    const [departMent, setDepartment] = useState();
    const [teacherName, setTeacherName] = useState();
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get(`${API_URL}/getLoggedInStudentData`, { withCredentials: true })
            .then(response => {
                if (response.data.stuloggedIn === true) {
                    setStudentDetails(response.data.studentData);
                    setTeacherName(response.data.teacherName);
                    setDepartment(response.data.Department);
                } else {
                    navigate('/login'); // User is not authenticated, redirect to login page
                }
            })
            .catch(error => {
                console.error('Error fetching student details:', error.message);
            });
    }, [navigate]);

    // Handle image error and set default image
    const handleImageError = (event) => {
        event.target.src = defaultImage;
    };

    return (
        <>
            {/* part of the student info */}
            <div id="studentDashContainer">
                <div id="studentImg">
                    <img alt="img" src={studentDetails?.photo || defaultImage} onError={handleImageError}/>
                </div>

                <div id="stuDashData">
                    <div id="studentInfo">
                        <p><b>Name:</b> {studentDetails?.student_name}</p>
                        <p><b>Reg no.: {studentDetails?.student_id}</b></p>
                        <p><b>Class:</b> {courseMapping[studentDetails?.selected_course]}</p>
                    </div>

                    <div id="colgInfo">
                        <p><b>Class Incharge: {teacherName}</b></p>
                        <p><b>Head of Department</b></p>
                        <p><b>Department: {departMent}</b></p>
                    </div>
                </div>
            </div>

            {/* part of the management */}
            <div id="stuDashManagementPart">
                {/* course and notification part */}
                <div id="stuNotification">
                    <div id="stuCourseSyallbus"></div>
                    <div id="notification"> Notification <br />(Coming Soon)</div>
                </div>
                {/* result and registration part */}
                <div id="stuResultSection">
                    <div class="ManageSectionBox" id="stuResult">Result</div>
                    <div class="ManageSectionBox" id="stuNextRegistration">Next Registration <br />(Coming Soon)</div>
                    <div class="ManageSectionBox" id="">Attendance <br />(Coming Soon)</div>
                </div>
            </div>
        </>
    )
}

export default StudentDash;
