import '../App.css';
import React, { useState } from "react";
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
import { API_URL } from '../utils/config';

function Courses() {
    const ugCourses = [
        { name: 'B.A.', iconClass: 'fas fa-graduation-cap', dataSet: 'ug_ba' },
        { name: 'B.Sc.', iconClass: 'fas fa-flask', dataSet: 'ug_bsc' },
        { name: 'B.Com.', iconClass: 'fas fa-chart-bar', dataSet: 'ug_bcom' },
        { name: 'BBA', iconClass: 'fas fa-briefcase', dataSet: 'ug_bba' },
        { name: 'BCA', iconClass: 'fas fa-laptop-code', dataSet: 'ug_bca' },
        { name: 'B.E./B.Tech.', iconClass: 'fas fa-cogs', dataSet: 'ug_bebt' },
        { name: 'LLB', iconClass: 'fas fa-balance-scale', dataSet: 'ug_llb' },
        { name: 'B.Pharm.', iconClass: 'fas fa-pills', dataSet: 'ug_bpharm' },
    ];

    const pgCourses = [
        { name: 'M.A.', iconClass: 'fas fa-graduation-cap', dataSet: 'pg_ma' },
        { name: 'M.Sc.', iconClass: 'fas fa-flask', dataSet: 'pg_msc' },
        { name: 'M.Com.', iconClass: 'fas fa-chart-bar', dataSet: 'pg_mcom' },
        { name: 'MBA', iconClass: 'fas fa-briefcase', dataSet: 'pg_mba' },
        { name: 'MCA', iconClass: 'fas fa-laptop-code', dataSet: 'pg_mca' },
        { name: 'M.Phil.', iconClass: 'fas fa-book', dataSet: 'pg_mphil' },
    ];

    const diplomaCourses = [
        { name: 'DCA', iconClass: 'fas fa-laptop', dataSet: 'diploma_dca' },
        { name: 'Diploma in Marketing', iconClass: 'fas fa-bullhorn', dataSet: 'diploma_marketing' },
        { name: 'PGDCA', iconClass: 'fas fa-graduation-cap', dataSet: 'diploma_pgdca' },
        { name: 'Diploma in Finance', iconClass: 'fas fa-chart-pie', dataSet: 'diploma_finance' },
        { name: 'Diploma in Design', iconClass: 'fas fa-paint-brush', dataSet: 'diploma_design' },
        { name: 'Diploma in Electric', iconClass: 'fas fa-bolt', dataSet: 'diploma_electric' },
    ];

    const [modalContent, setModalContent] = useState({
        courseName: '',
        eligibility: '',
        fee: '',
        duration: '',
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleBoxeContClick = (dataSet) => {
        // Assuming you have a function to fetch data from the backend API
        fetch(`${API_URL}/api/course/${dataSet}` )
            .then(response => response.json())
            .then(data => {
                setModalContent({
                    courseName: data.courseName,
                    eligibility: data.eligibility,
                    fee: data.fee,
                    minimumMarks: data.minimumMarks,
                    seats: data.seats,
                    duration: data.duration,
                });
                setIsModalVisible(true)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <>
            {/* Top nav */}
            <TopHeader />
            <Navigation />
            {/* Course section */}
            <div id="PageContainer">
                <div id="coursePage">

                    <div id="pageTitle"><span>COURSES</span></div>
                    <div className="courses">

                        {/* Diploma courses */}
                        <div className="courseTitle">
                            <p>Diploma Courses</p>
                        </div>
                        <div className='courseList'>
                            {diplomaCourses.map((course, index) => (
                                <div key={index} className="boxeCont" data-set={course.dataSet} onClick={() => handleBoxeContClick(course.dataSet)}>
                                    <div className="boxIcon">
                                        <i className={course.iconClass}></i>
                                    </div>
                                    <p>{course.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* UG courses */}
                        <div className="courseTitle">
                            <p>UG Courses</p>
                        </div>

                        <div className='courseList'>
                            {ugCourses.map((course, index) => (
                                <div key={index} className="boxeCont" data-set={course.dataSet} onClick={() => handleBoxeContClick(course.dataSet)}>
                                    <div className="boxIcon">
                                        <i className={course.iconClass}></i>
                                    </div>
                                    <p>{course.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* PG courses */}
                        <div className="courseTitle">
                            <p>PG Courses</p>
                        </div>
                        <div className='courseList'>
                            {pgCourses.map((course, index) => (
                                <div key={index} className="boxeCont" data-set={course.dataSet} onClick={() => handleBoxeContClick(course.dataSet)} >
                                    <div className="boxIcon">
                                        <i className={course.iconClass}></i>
                                    </div>
                                    <p>{course.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Your modal code */}

            {isModalVisible &&
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>{modalContent.courseName}</h2>
                        <p id="coursepara">Eligibility: {modalContent.eligibility}</p>
                        <p id="coursepara">Seats: {modalContent.seats}</p>
                        <p id="coursepara">Minimum Marks: {modalContent.minimumMarks}</p>
                        <p id="coursepara">Fee: {modalContent.fee}</p>
                        <p id="coursepara">Duration: {modalContent.duration}</p>
                    </div>
                </div>
            }
            {/* Footer */}
            <Footer />
        </>
    );
}

export default Courses;