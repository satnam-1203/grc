import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';
import { API_URL } from '../utils/config';

function FeeNotification() {
    const [studentDetails, setStudentDetails] = useState({});
    const [fee, setFee] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`${API_URL}/getLoggedInStudentData`, { withCredentials: true })
            .then(response => {
                if (response.data.stuloggedIn === true) {
                    setStudentDetails(response.data.studentData);
                    setFee(response.data.courseFee);
                } else {
                    navigate('/home');
                }
            })
            .catch(error => {
                console.error('Error fetching student details:', error.message);
                navigate('/home');
            });
    }, [navigate]);

    return (
        <>
            <div id="feeNotifcontainer" style={{ color: "black" }}>
                <div id="pageTitle">
                    <span>Notification</span>
                </div>

                {studentDetails?.verification === "no" && (
                    <p>You are not verified yet. Please wait or contact school staff.</p>
                )}

                {/* {studentDetails?.verification === "Yes" && studentDetails?.status === "null" && (
                    <p>You are approved. Please pay the fee.</p>
                )} */}

                {studentDetails?.verification === "Yes" && studentDetails?.status === "Approved" && studentDetails?.fee_status === "no" && (
                    <div style={{ fontSize: "20px" }}>
                        <p>Dear {studentDetails?.student_name},</p>
                        <p>We are pleased to inform you that your registration for the upcoming semester/class has been approved!</p>
                        <p>Please note that along with the approval, there are certain fees associated with the registration process. You are required to pay the registration fee by <strong>[due date]</strong>. The registration fee covers <strong>[details of what the fee covers]</strong>.</p>
                        <h3>Payment Details:</h3>
                        <ul>
                            <li>Registration Fee: <strong>{fee} RS</strong></li>
                            <li>Due Date: <strong>[Due Date]</strong></li>
                        </ul>
                        <p>Please make sure to complete the payment before the deadline to secure your enrollment for the semester.</p>
                        <p>If you have any questions or need further assistance, feel free to contact the administration office.</p>
                        <div className="footer">
                            <Link id="linkBtn" to="/payment">Pay</Link>
                        </div>
                    </div>
                )}

                {studentDetails?.verification === "Yes" && studentDetails?.status === "Approved" && studentDetails?.fee_status === "Yes" &&  (!studentDetails?.roll_no || studentDetails?.roll_no.trim() === "") && (
                    <p>Please wait for Clerk approval for fee. </p>
                )}


                {studentDetails?.verification === "Yes" && studentDetails?.status === "Approved" && studentDetails?.fee_status === "Yes" && studentDetails?.roll_no && studentDetails?.roll_no.trim() !== "" && (
                    <p>Your fee is accepted. Your roll number is:{studentDetails?.roll_no} </p>
                )}

                {studentDetails?.status === "Disapproved" && (
                    <p>You are disapproved. If you have any questions or need further assistance, feel free to contact the administration office.</p>
                )}

                {/* {approved === false && (
                    <>
                        <p>Dear {studentDetails?.student_name},</p>
                        <p>Your Registration is pending! If you have any questions or need further assistance, feel free to contact the administration office.</p>
                    </>
                )} */}

            </div>
        </>
    );
}

export default FeeNotification;
