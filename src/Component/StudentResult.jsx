import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/config';

function StudentResult() {
    const [studentResults, setStudentResults] = useState([]);
    const [courseSubjects, setCourseSubjects] = useState([]);
    const [totalMarks, setTotalMarks] = useState(0);
    const [obtainedMarks, setObtainedMarks] = useState(0);
    const [alert, setAlert] = useState("");
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


    useEffect(() => {
        // Fetch student results data from backend API using Axios
        Axios.get(`${API_URL}/result`, { withCredentials: true }) // Include cookies for session authentication
            .then(response => {
                if (response.data.sucess === false) {
                    setAlert(response.data.message)
                } else {
                    const { resultData, subjectData } = response.data;
                    setStudentResults(resultData);
                    setCourseSubjects(subjectData);
                }

            })
            .catch(error => {
                console.error('Error fetching student results:', error);
            });
    }, []); // Run effect only once after component is mounted

    useEffect(() => {
        // Calculate total and obtained marks
        let total = 0;
        let obtained = 0;
        if (studentResults.length > 0) {
            Object.keys(studentResults[0]).forEach(key => {
                // Exclude specific keys from calculation
                if (!['course_id', 'student_id', 'course_name'].includes(key)) {
                    total += 100; // Assuming maximum marks for each subject is 100
                    obtained += parseInt(studentResults[0][key], 10) || 0; // Convert to integer and add to obtained marks
                }
            });
        }
        setTotalMarks(total);
        setObtainedMarks(obtained);
    }, [studentResults]);

    return (
        <div id="result">
            <h1 style={{ marginBottom: "20px" }}>Results</h1>
            {alert && <div className="alert">{alert}</div>}

            {!alert && (<>
                <div id="stuInfoRes">
                    <p> <strong>Name:</strong> {studentDetails?.student_name}</p>
                    <p >Course: {courseSubjects.length > 0 && courseSubjects[0].course_name}</p>
                </div>

                <div id="resSection">
                    <div id="subName">
                        <ul>
                        <li> <strong>Course Name</strong> </li>
                            {courseSubjects.length > 0 && Object.keys(courseSubjects[0]).map((key, index) => {
                                // Exclude specific keys from rendering
                                if (!['subject_id', 'student_id', 'course_name'].includes(key)) {
                                    const value = courseSubjects[0][key];
                                    // Check if the value is not null or undefined
                                    if (value !== null && value !== undefined) {
                                        return <li key={index}>{value}</li>;
                                    } else {
                                        return null; // Render nothing if value is null or undefined
                                    }
                                }
                                return null;
                            })}

                        </ul>

                    </div>

                    <div id="subName">
                        <ul>
                        <li> <strong>Marks</strong> </li>
                            {studentResults.length > 0 && Object.keys(studentResults[0]).map((key, index) => {
                                // Exclude specific keys from rendering
                                if (!['subject_id', 'student_id', 'course_name'].includes(key)) {
                                    const value = studentResults[0][key];
                                    // Check if the value is not null or undefined
                                    if (value !== null && value !== undefined) {
                                        return <li key={index}>{value}</li>;
                                    } else {
                                        return null; // Render nothing if value is null or undefined
                                    }
                                }
                                return null;
                            })}
                        </ul>

                    </div>
                </div>


                <div style={{ width: "90%", marginTop: "40px", fontSize: "18px", textAlign: "right" }}>
                    <p><strong>Obtained Marks: </strong> {obtainedMarks}</p>
                    <p> <strong>Total Marks: </strong> {totalMarks}</p>
                </div>
            </>)}
        </div>
    );
}

export default StudentResult;
