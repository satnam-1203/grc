import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import courseMapping from '../utils/Course';
import { API_URL } from '../utils/config';
import defaultImage from '../Images/profile-icon.jpg';

function StudentProfile() {
    const [studentDetails, setStudentDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`${API_URL}/getLoggedInStudentData`, { withCredentials: true })
            .then(response => {
                try {
                    if (response.data.stuloggedIn === true) {
                        setStudentDetails(response.data.studentData);
                    } else {
                        navigate('/');
                    }
                } catch (err) {
                    console.log(err)
                }
            })
            .catch(error => {
                console.error('Error fetching student details:', error.message);
                navigate('/');
            })
    }, [navigate]);

        // Handle image error and set default image
        const handleImageError = (event) => {
            event.target.src = defaultImage;
        };
 
    return (
        <div id="studentProdileContaner">
            <div id="studentDashContainer">
                <div id="studentImg">
                    <img alt="img" src={studentDetails?.photo || defaultImage}  onError={handleImageError}/>
                </div>
                <div id="stuDashData">
                    <div id="studentInfo">
                        <p><b>Name:</b> {studentDetails?.student_name}</p>
                        <p><b>Class:</b> {courseMapping[studentDetails?.selected_course]}</p>
                    </div>
                </div>
            </div>
    
            <div id="studentProfData">
                <p id="profDataTitle"> Basic Details:</p>
                <div className="profData">
                    {Object.entries(studentDetails).map(([key, value]) => (
                        ['student_name', 'selected_course'].includes(key) ? null : (
                            ['previous_class', 'result', 'obtained', 'batch', 'total_marks', 'grade', 'percentage', 'photo', 'sign'].includes(key) ? null : (
                                <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</p>
                            )
                        )
                    ))}
                </div>
            </div>
    
            <div id="studentProfData">
                <p id="profDataTitle"> Qualification:</p>
                <div className="profData">
                    {Object.entries(studentDetails).map(([key, value]) => (
                        ['previous_class', 'result', 'obtained', 'batch', 'total_marks', 'grade', 'percentage'].includes(key) && (
                            <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</p>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
                        }    

export default StudentProfile;