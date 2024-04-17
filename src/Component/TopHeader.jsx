import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Logout from "../Component/Logout";
import Axios from 'axios';
import { API_URL } from '../utils/config';

function Topheader() {
    const [logName, setLogName] = useState("");
    const [stulogName, setStuLogName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get(`${API_URL}/getLoggedInStudentData`, { withCredentials: true })
            .then(response => {
                try {
                    if (response.data.stuloggedIn === true) {
                        setStuLogName(response.data.studentData?.student_name);
                        setLoggedIn(true);
                    }
                } catch (err) {
                    console.log("Error fetching student details:", err);
                }
            })
            .catch(error => {
                console.error('Error fetching student details:', error.message);
            });
    }, []);

    useEffect(() => {
        Axios.get(`${API_URL}/user`).then((response) => {
            try {
                if (response.data.loggedIn === true) {
                    const loggedInUserName = response.data.user.name;
                    setLogName(loggedInUserName);
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error("Error fetching login data:", error);
            }
        });
    }, []);

    return (
        <div id="top-header">
            <div className="topHeaderElements">
                <div className="welcomeTxt" style={{ color: "white" }}>
                    {loggedIn && stulogName && <Link style={{ textDecoration: "none", color: "white" }} to="/student-dash">Welcome {stulogName}</Link>}
                    {loggedIn && !stulogName && <Link style={{ textDecoration: "none", color: "white" }} to="/management">Welcome {logName}</Link>}
                </div>
                <div>
                    {loggedIn && !stulogName ? (
                        <Logout />
                    ) : (
                        <Link style={{ textDecoration: "none", color: "white" }} to="/staff-login">
                            Staff Login
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Topheader;
