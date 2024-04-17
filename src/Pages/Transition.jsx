import React, { useEffect, useState } from "react";
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
import Axios from 'axios';
import { API_URL } from '../utils/config';
import { useNavigate, useLocation } from "react-router-dom";

function Transition() {
    const [paymentLoading, setPaymentLoading] = useState(true);
    const [transitionLoading, setTransitionLoading] = useState(false);
    const [studentDetails, setStudentDetails] = useState(null);
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [transactionId, setTransactionId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    // const upiId = location.state ? location.state.upiId : null;
    const bank = location.state ? location.state.selectMethod : null;
    const fee = location.state ? location.state.fee : null;

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        // console.log("ok")
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
        // Generate transaction ID when student details are set
        if (studentDetails) {
            generateTransactionId();
        }
    }, [studentDetails]);

    const generateTransactionId = () => {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substring(2, 15);
        const res = timestamp + randomString;

        setTransactionId(res);
    }

    useEffect(() => {
        // Simulate payment process
        const paymentTimeout = setTimeout(() => {
            // Simulate payment failure randomly
            const isPaymentSuccessful = Math.random() < 0.8; // 80% chance of success

            if (isPaymentSuccessful) {
                setPaymentLoading(false);
                setTransitionLoading(true);

                // Simulate transition time
                setTimeout(() => {
                    setTransitionLoading(false);

                    // Insert payment into database
                    const paymentDetails = {
                        studentId: studentDetails?.student_id,
                        transactionId: transactionId,
                        date: new Date().toISOString(),
                        fee:fee,
                        payment_method: bank,
                    };

                    Axios.post('http://localhost:3001/insertPayment', paymentDetails)
                        .then(response => { 
                            console.log('Payment inserted successfully:', response.data);
                        })
                        .catch(error => {
                            console.error('Error inserting payment:', error.message);
                        });
                }, 2000); // Assuming 2 seconds for transition
            } else {
                // Payment failed
                setPaymentFailed(true);
                setPaymentLoading(false);
            }
        }, 2000); // Assuming 2 seconds for payment

        return () => clearTimeout(paymentTimeout); // Cleanup the timeout on component unmount
    }, [studentDetails, bank, fee, transactionId]); // Include studentDetails, bank, and transitionId in the dependency array

    return (
        <>
            <TopHeader />
            <Navigation />

            <div id="PageContainer">
                <div id="transitionSection">
                    {paymentLoading && (
                        <div className="loader">
                            <p>Processing your payment securely...</p>
                            <div className="loader-spinner"></div>
                        </div>
                    )}
                    {transitionLoading && (
                        <div className="loader">
                            <p>Finalizing your transaction...</p>
                            <div className="loader-spinner"></div>
                        </div>
                    )}
                    {!paymentLoading && !transitionLoading && (
                        <>
                            {paymentFailed && (
                                <div className="payment-failed-message" style={{ color: "red", fontWeight: "bold" }}>
                                    <p>Sorry, your payment was unsuccessful. Please try again later.</p>
                                </div>
                            )}
                            {!paymentFailed && (
                                <>
                                    <h2 style={{ color: "green", fontWeight: "bold" }}>Payment Successful!</h2>
                                    <div id="transData">
                                        <p>Thank you for your payment. Below are the transaction details:</p>

                                        <ul>
                                            <li><strong>Transaction ID:</strong> {transactionId}</li>
                                            <li><strong>Amount: </strong> {fee} RS</li>
                                            <li><strong>Date: </strong> {new Date().toISOString()}</li>
                                            <li><strong>Method of Payment:</strong>{bank}</li>
                                        </ul>

                                        <p>You will receive your roll number within 24 hours.</p>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Transition;
