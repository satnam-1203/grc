import '../App.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
import Sidebar from "../Component/StudentSideMenu";
import StudentProfile from '../Component/StudentProfile';
import StudentDash from '../Component/StuDash';
import StudentResult from '../Component/StudentResult';
import StudentSyllabus from '../Component/studentSyllabus';
import FeeNotification from './feeNotif';
import Axios from 'axios';
import { API_URL } from '../utils/config';

function StudentDashboard() {
    const [selectedTab, setSelectedTab] = useState("student_dashboard");
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    Axios.defaults.withCredentials = true;

useEffect(() => {
    Axios.get(`${API_URL}/getLoggedInStudentData`, { withCredentials: true })
        .then(response => {
            if (response.data.stuloggedIn === true) {
                console.log("ok");
            } else {
                navigate('/');
            }
        })
        .catch(error => {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
                console.error('Status code:', error.response.status);
                // Handle 401 error specifically
                if (error.response.status === 401) {
                    console.error('Unauthorized: Please check your authentication credentials.');
                    // Redirect to login or home page as appropriate
                    navigate('/');
                }
            } else if (error.request) {
                console.error('No response received from server:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            navigate('/');
        });
}, [navigate]);

    return (
        //  main container of body
        <>
            <TopHeader />
            <Navigation />
            {/* main webpage of contact us div */}
            <div id="PageContainer">
                <Sidebar onTabChange={handleTabChange} />
                {/* student dashboard page */}
                <div className="managementPage">
                    {selectedTab === "student_dashboard" && (
                        <div id="tabContent">
                            <div id="tabData">
                                <StudentDash />
                            </div>

                        </div>
                    )}

                    {/* div for sidebar */}
                    {/* student profile */}
                    {selectedTab === "student_profile" && (
                        <div id="tabContent">
                            <div id="tabData">
                                <StudentProfile />
                            </div>

                        </div>
                    )}

                    {/* student result */}
                    {selectedTab === "student_result" && (
                        <div id="tabContent">
                            <div id="tabData">
                                <StudentResult />
                            </div>

                        </div>
                    )}

                    {/* student result */}
                    {selectedTab === "student_notification" && (
                        <div id="tabContent">
                            <div id="tabData">
                                <FeeNotification />
                            </div>

                        </div>
                    )}

                    {/* student result */}
                    {selectedTab === "student_syllabus" && (
                        <div id="tabContent">
                            <div id="tabData">
                                <StudentSyllabus />
                            </div>

                        </div>
                    )}


                </div>
            </div>
            <Footer />
        </>

    );
}

export default StudentDashboard;
