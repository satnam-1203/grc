import '../App.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
import Image from "../Images/Learning.avif"
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { API_URL } from '../utils/config';

function Home() {
    const [studentId, setStudentId] = useState("");
    const [studentPass, setStudentPass] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const courseData = [
        { icon: 'fas fa-graduation-cap', title: 'PG Courses' },
        { icon: 'fas fa-university', title: 'UG Courses' },
        { icon: 'fas fa-file-alt', title: 'Diploma Courses' },
    ];

    const othersData = [
        { icon: 'fas fa-graduation-cap', title: 'Online Admission Portal' },
        { icon: 'fas fa-briefcase', title: 'Placements' },
        { icon: 'fas fa-theater-masks', title: 'Cultural Activities' },
        { icon: 'fas fa-download', title: 'Downloads' },
        { icon: 'fas fa-clipboard-check', title: 'Examination' },
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await Axios.post(`${API_URL}/studentlogin`, { studentId, studentPass }, { withCredentials: true });

        if (response.data.auth) {
            navigate("/student-dash");
        } else {
            setAlertMessage(response.data.message);
            setIsModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            {/* // top nav starts here */}
            <TopHeader></TopHeader>

            {/* // top nav starts here */}
            <Navigation></Navigation>

            {/* intro picture */}
            <div className='IntroBanner'>
                <img src={Image} alt="" />
                <div id="blurry">
                    <p id="imageText" class="banner-text">India's no 1 College</p>
                    <button class="get-started-button">Get Started</button>
                </div>
            </div>

            {/* student login section starts here */}
            <div className='HomeLoginSection'>
                <div className='loginInfo'>
                    <p>Student Login</p>
                    <h2>(Who can login)</h2>
                    <ul>
                        <li>UG Course Students</li>
                        <li>PG Course Students</li>
                        <li>Diploma Course Students</li>
                        <li>Re-appear Students</li>
                    </ul>
                </div>

                <div id='loginMenu'>
                    <input type="text" name="" placeholder="Student ID" id="id" onChange={(e) => { setStudentId(e.target.value) }} />
                    <input type="password" name="" placeholder="Password" id="pass" onChange={(e) => { setStudentPass(e.target.value) }} />
                    <button onClick={handleLogin}>Login</button>
                    <a href="/#" id="forgetPass">Forget Passowrd ?</a>
                </div>
            </div>

            {/* student registration section starts here */}
            <div className='HomeRegSection'>

                <div id="RegNotification">
                    <p>Admissions are open until<br /> April 30th for the 2024 batch.</p>
                    <Link id="linkBtn" to="/registration">Apply Now</Link>
                </div>

                <div className='RegInfo'>
                    <p>Registrations</p>
                    <h2>List of Courses</h2>
                    <ul>
                        <li>Bachelor of Engineering</li>
                        <li>Master of Pharmacy</li>
                        <li>Pharm D.</li>
                        <li>Master of Law</li>
                    </ul>
                </div>
            </div>

            {/* home course section starts here */}
            <div id="HomeCourseContainer">
                <p id="courseTitle">Our Courses</p>

                <div id="HomeCourseList">
                    {courseData.map((course, index) => (
                        <div id="boxeCont" key={index}>
                            <div className="boxes">
                                <i className={course.icon}></i>
                            </div>
                            <p id="boxesPara">{course.title}</p>
                        </div>
                    ))}
                </div>

                <Link className="link" id="linkBtn" to="/courses">View More</Link>
            </div>

            {/* other home section starts here */}
            <div id="HomeOtherContainer">
                <p id="othersTitle">HOT LINKS</p>

                <div id="HomeOthersList">
                    {othersData.map((item, index) => (
                        <div id="boxeCont" key={index}>
                            <div className="boxes">
                                <i className={item.icon}></i>
                            </div>
                            <p id="boxesPara">{item.title}</p>
                        </div>
                    ))}

                </div>
            </div>

            {/* home contact section starts here */}
            <div id="homeContactSection">
                <p id="contactPara">Need assistance? Contact us with any issues or questions. We're here to support you!</p>

                <Link className="link" id="linkBtn" to="/contact">Contact Us</Link>
            </div>

            {/* Your modal code */}
            {isModalVisible && <div id="myModal" className="modal">
                <div className="modal-content" style={{ textAlign: "center" }}>
                    <div><span className="close" onClick={handleCloseModal}>&times;</span></div>
                    <div><p id="p">{alertMessage}</p></div>


                </div>
            </div>
            }
            {/* footer section starts here */}
            <Footer />
        </>
    );
}

export default Home;