import React, { useEffect, useState } from "react";
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import { useNavigate } from "react-router-dom";
import Footer from "../Component/Footer";
import courseMapping from '../utils/Course';
import Axios from 'axios';
import { API_URL } from '../utils/config';

function Payment() {
    const [bankOption, setBankOption] = useState("");
    const [chooseBank, setChooseBank] = useState("");
    const [feee, setFee] = useState();
    const [studentDetails, setStudentDetails] = useState({});
    const [id, setId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ok")
        Axios.get(`${API_URL}/getLoggedInStudentData`, { withCredentials: true })
            .then(response => {
                try {
                    if (response.data.stuloggedIn === true) {
                        setStudentDetails(response.data.studentData);
                        setFee(response.data.courseFee);
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

    const submit = () => {
        navigate("/transition", {
            state: {
                selectMethod: bankOption,
                upiId: id,
                fee: feee,
            }
        })
    } 

    const renderBankOptions = () => {
        return (
            <select name="" id="" defaultValue="" onChange={(e) => { setChooseBank(e.target.value) }}>
                <option value="" disabled hidden>Select Bank</option>
                <option value="state bank of India">State Bank Of India</option>
                <option value="Central Bank Of India">Central Bank Of India</option>
                <option value="Canara Bank">Canara Bank</option>
            </select>
        );
    };

    const stuClass = courseMapping[studentDetails?.selected_course] + " " + studentDetails?.selected_year + "Year";

    return (
        <>
            <TopHeader />
            <Navigation />

            <div id="PageContainer">
                <div id="enrollSection">
                    <p id="pageTitle">Payment</p>

                    <div id="paymentSection">
                        <div id="studentPaySection">
                            <div id="studentdetail">
                                <h2>Student Details:</h2>
                                <p><b>Student:</b> {studentDetails?.student_name}</p>
                                <p><b>Registration:</b> {studentDetails?.student_id}</p>
                                <p><b>Class:</b> {stuClass}</p>
                                <p><b>Mobile No:</b> {studentDetails?.phone_num}</p>
                            </div>

                            <select name="" id="" defaultValue="" onChange={e => { setBankOption(e.target.value) }}>
                                <option value="" disabled hidden>Select Payment Method</option>
                                <option value="upi">UPI</option>
                                <option value="netBank">Net Banking</option>
                            </select>

                            {bankOption === "upi" && (
                                <input type="text" name="" id="" placeholder="UPI Id" onChange={e => setId(e.target.value)} />
                            )}

                            {bankOption === "netBank" && (
                                <>{renderBankOptions()}</>

                            )}

                        </div>

                        <div id="staffPaySection">
                            <h2>Bank Details:</h2>
                            <p><b>Bank Name:</b> Central Bank of India</p>
                            <p><b>Bank Account:</b> 9999999999</p>
                            <p><b>IFSC Code:</b> 123123123</p>
                            <p><b>Branch:</b> Nabha</p>
                            {/* <h2>UPI Details:</h2> */}
                            <p style={{ marginTop: "25px" }}><b>UPI ID:</b> grc@upi.sbi</p>
                            <h2>Fee Details:</h2>
                            <p><b>Fee:</b> {feee}</p>
                            <p><b>Deadline:</b> 20-6-2024</p>
                        </div>
                    </div>

                    <button onClick={submit}>Pay Fee</button>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Payment;
