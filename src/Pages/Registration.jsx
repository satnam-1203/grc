import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
import { API_URL } from '../utils/config';

function Registration() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    // Page 1 state variables
    const [studentName, setStudentName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [aadharCard, setAadharCard] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // Page 2 state variables
    const [previousClass, setPreviousClass] = useState('');
    const [result, setResult] = useState('');
    const [obtained, setObtained] = useState('');
    const [batch, setBatch] = useState('');
    const [isGradeBased, setIsGradeBased] = useState(false);
    const [totalMarks, setTotalMarks] = useState('');
    const [grade, setGrade] = useState('');

    // Page 3 state variables
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [courses, setCourses] = useState([]);
    const [minimumMarks, setMinimumMarks] = useState('');

    // Page 4 state variables
    const [photoFile, setPhotoFile] = useState(null);
    const [signFile, setSignFile] = useState(null);


    //alert message
    const [alertMessage, setAlertMessage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    //function for next page
    const next = () => {
        if (page === 1 && [studentName, fatherName, motherName, dob, gender, aadharCard, phoneNumber, email, address].some(field => field.trim() === '')) {
            alert('Please fill in all required fields.');
        } else if (page === 2 && [previousClass, result, batch].some(field => field.trim() === '')) {
            alert('Please fill in all required fields.');
        } else if (page === 3 && [selectedCategory, selectedCourse, selectedYear].some(field => field.trim() === '')) {
            alert('Please fill in all required fields.');
        } else if (page === 4 && (photoFile === null || signFile === null)) {
            alert('Please fill in all required fields.');
        } else if (page === 2 && isGradeBased) {
            // For grade-based, set obtained and total marks to null
            setObtained("");
            setTotalMarks("");
            setPage((pages) => pages + 1);
        } else {
            setPage((pages) => pages + 1);
        }
    }

    const prev = () => { setPage((pages) => pages - 1) }

    //func for generate year
    const generateYearOptions = (duration) => {
        const match = duration.match(/(\d+)\s*(year|month)/i);

        if (!match) {
            return null;
        }

        const [, value, unit] = match;
        const totalYears = unit.toLowerCase() === 'year' ? parseInt(value, 10) : Math.ceil(parseInt(value, 10) / 12);
        const yearOptions = [];

        for (let years = 1; years <= totalYears; years++) {
            const optionLabel = `${years} ${years === 1 ? 'Year' : 'Years'}`;
            yearOptions.push(<option key={years} value={optionLabel}>{optionLabel}</option>);
        }

        return yearOptions;
    };

    //function to calculate percenatge of marks
    const percentageCalc = () => {
        const minimumMarksNumeric = parseFloat(minimumMarks.replace('%', ''));
        const percentage = ((obtained / totalMarks) * 100).toFixed(2);;

        // Check marks condition
        const conditionMet = (grade >= minimumMarksNumeric) || (percentage && (obtained / totalMarks * 100) >= minimumMarksNumeric);

        const message = conditionMet
            ? `Ok${isGradeBased ? '' : percentage}`
            : `Registration is not possible because your percentage (${isGradeBased ? grade : percentage}%) does not meet the minimum requirement of ${minimumMarks}`;

        const gradeMarks = grade;

        return { conditionMet, message, percentage, gradeMarks };
    }

    //function for correct way to add data input
    const handleInputChange = (e, setState) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'phoneNumber') {
            // Format phone number as 12345-67890
            formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
            if (formattedValue.length > 5) {
                formattedValue = `${formattedValue.slice(0, 5)}-${formattedValue.slice(5, 10)}`;
            }
        }

        if (name === 'aadharCard') {
            // Remove non-digit characters
            formattedValue = value.replace(/\D/g, '');

            // Format the input as 1234-1234-1234
            if (formattedValue.length > 4) {
                formattedValue = `${formattedValue.slice(0, 4)}-${formattedValue.slice(4)}`;
            }
            if (formattedValue.length > 9) {
                formattedValue = `${formattedValue.slice(0, 9)}-${formattedValue.slice(9)}`;
            }

            // Limit the length to 14 characters (e.g., 1234-1234-1234)
            if (formattedValue.length > 14) {
                formattedValue = formattedValue.slice(0, 14);
            }
        }

        if (name === 'dob') {
            formattedValue = value.replace(/\D/g, '');
            // Format the input as DD/MM/YYYY
            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
            }
            if (formattedValue.length > 5) {
                formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(5)}`;
            }
            // Limit the length to 10 characters
            formattedValue = formattedValue.slice(0, 10);
        }

        setState(formattedValue);
    };

    //submit student registration
    const submitReg = async () => {
        // Check if the files are selected
        if (!photoFile || !signFile) {
            alert('Please select both a photo and a sign file.');
            return;
        }

        const convertFileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    resolve(reader.result.split(',')[1]); // Get base64 string without data:image/jpeg;base64,
                };
                reader.onerror = (error) => reject(error);
            });
        };

        const { conditionMet, message } = percentageCalc();

        const { percentage, gradeMarks } = percentageCalc();

        //this condition checks percentage is grade based or non grade based
        const percent = isGradeBased ? parseFloat(gradeMarks) : percentage;

        const grades = {
            95: 'A++', 90: 'A+', 85: 'A', 80: 'B+', 75: 'B', 60: 'C', 50: 'D', 30: 'Fair', 0: 'Fail',
        };

        // Use the 'grade' variable directly, not 'selectedGrade'
        const selectedGrade = isGradeBased ? grades[grade] : '';

        const status = "null";

        //insert data into sql

        const formData = new FormData();
        formData.append('basicDetails', JSON.stringify({
            studentName, fatherName, motherName, dob, gender, aadharCard, phoneNumber, email, address
        }));
        formData.append('qualifications', JSON.stringify({
            previousClass, result, obtained, batch, totalMarks, selectedGrade, percent: isGradeBased ? parseFloat(gradeMarks) : percentage
        }));
        formData.append('courseInfo', JSON.stringify({
            selectedCategory, selectedCourse, selectedYear
        }));
        formData.append('photoFile', photoFile); // Append photo file
        formData.append('signFile', signFile);

        //generate student id and pass 
        if (!conditionMet) {
            setIsModalVisible(true);
            setAlertMessage(message);

        } else {

            await axios.post('http://localhost:3001/api/registerStudent', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                // console.log(res.data)
                if (res.data.registered === true) {
                    // Student is already registered, show an alert
                    setAlertMessage(res.data.message);
                    setIsModalVisible(true);
                } else {
                    const { studentId, studentPassword } = res.data;

                    // Navigate only if the student is not registered
                    navigate('/regInfo', {
                        state: {
                            studentId: studentId,
                            pass: studentPassword,
                        },
                    });

                }
            })

        }
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedCourse('');
        setSelectedDuration('');
        setMinimumMarks('');

        if (category) {
            axios.post(`${API_URL}/api/getCourses`, { category })
                .then((response) => {
                    setCourses(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching courses:', error.message);
                });
        }
    };

    const handleCourseChange = (e) => {
        const course = e.target.value;
        setSelectedCourse(course);
    };

    useEffect(() => {
        if (selectedCourse) {
            const selectedCourseInfo = courses.find((courseInfo) => courseInfo.course_id === selectedCourse);
            setSelectedDuration(selectedCourseInfo ? selectedCourseInfo.duration : '');
            setMinimumMarks(selectedCourseInfo ? selectedCourseInfo.minimum_marks : '');
        }
    }, [selectedCourse, courses]);

    return (
        <>
            {/* Top nav */}
            <TopHeader />
            <Navigation />

            {/* Registration section */}
            <div id="PageContainer">
                <div id="registrationPage">
                    <div id="pageTitle"><span>Student Registration</span></div>

                    {/* student basic info container */}
                    <div className="registrationStep" style={{ display: page === 1 ? "block" : "none" }}>
                        <div id="studentBasic">
                            <p id="studentRegTitle">Basic Details:</p>
                            <div id="stuBasicMenu">
                                <input type="text" name="" id="" placeholder='Student Name' value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                                <input type="text" name="" id="" placeholder="Father's Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
                                <input type="text" name="" id="" placeholder="Mother's Name" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
                                <input type="text" name="dob" id="" placeholder="Date of Birth (D/M/Y)" value={dob} onChange={(e) => handleInputChange(e, setDOB)} />

                                {/* Use a select dropdown for gender */}
                                <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} defaultValue="">
                                    <option value="" disabled hidden>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>

                                <input type="text" name="aadharCard" id="" placeholder='Aadhar Card' value={aadharCard} onChange={(e) => handleInputChange(e, setAadharCard)} />
                                <input type="text" name="phoneNumber" id="" placeholder='Phone Number' value={phoneNumber} onChange={(e) => handleInputChange(e, setPhoneNumber)} />
                                <input type="email" name="" id="" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" name="" id="" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* student qualification section */}
                    <div className="registrationStep" style={{ display: page === 2 ? "block" : "none" }}>
                        <div id="studentQualif">
                            <p id="studentRegTitle">Qualifications:</p>
                            <div id="stuQualifMenu">
                                <input type="text" name="" id="" placeholder='Previous class' value={previousClass} onChange={(e) => setPreviousClass(e.target.value)} />

                                {/* select dropdown for result */}
                                <select name="result" id="result" value={result} onChange={(e) => setResult(e.target.value)} defaultValue="">
                                    <option value="" disabled hidden>Result</option>
                                    <option value="pass">Pass</option>
                                    <option value="fail">Fail</option>
                                    <option value="awaited">Result Awaited</option>
                                </select>

                                <input type="text" name="" id="" placeholder='Obtained' value={obtained} disabled={isGradeBased} onChange={(e) => setObtained(e.target.value)} />
                                <input type="text" name="" id="" placeholder='Batch' value={batch} onChange={(e) => setBatch(e.target.value)} />

                                {/* Checkbox for grade-based system */}
                                <label className="container">Grades? if applicable
                                    <input type="checkbox" checked={isGradeBased} onChange={(e) => setIsGradeBased(e.target.checked)} />
                                    <span className="checkmark"></span>
                                </label>
                                {isGradeBased === true ?
                                    <select name="grade" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                                        <option value="" disabled hidden>Grade</option>
                                        <option value="95">A++</option>
                                        <option value="90">A+</option>
                                        <option value="85">A</option>
                                        <option value="80">B+</option>
                                        <option value="75">B</option>
                                        <option value="60">C</option>
                                        <option value="50">D</option>
                                        <option value="30">Fair</option>
                                        <option value="0">Fail</option>
                                    </select>

                                    : <input type="text" name="totalMarks" id="totalMarks" placeholder='Total Marks' value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} />

                                }
                            </div>
                        </div>
                    </div>

                    {/* student course info container */}
                    <div className="registrationStep" style={{ display: page === 3 ? "block" : "none" }}>
                        <div id="studentCourse">
                            <p id="studentRegTitle">Course:</p>
                            <div id="stuCourseMenu">
                                {/* select dropdown for select category */}
                                <select name="courseCategory" id="courseCategory" value={selectedCategory} onChange={handleCategoryChange} defaultValue="">
                                    <option value="" disabled hidden>Select Category</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="ug">Undergraduate (UG)</option>
                                    <option value="pg">Postgraduate (PG)</option>
                                </select>

                                {/* select dropdown for select course */}
                                <select name="course" id="course" value={selectedCourse} style={{ visibility: selectedCategory ? 'visible' : 'hidden' }} onChange={handleCourseChange}>
                                    <option value="" disabled hidden>Select Course</option>
                                    {selectedCategory && (
                                        courses.map((course) => (
                                            <option key={course.course_id} value={course.course_id}>
                                                {course.course_name}
                                            </option>
                                        ))
                                    )}
                                </select>

                                {/* select dropdown for select year */}
                                {/* Render year dropdown if a course is selected */}
                                <select name="year" id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} defaultValue="" style={{ visibility: selectedCourse ? 'visible' : 'hidden' }}>
                                    <option value="" disabled hidden>Select Year</option>
                                    {generateYearOptions(selectedDuration)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* student docs info container */}
                    <div className="registrationStep" style={{ display: page === 4 ? "block" : "none" }}>
                        <div id="studentDocs">
                            <p id="studentRegTitle">Student Documents:</p>
                            <div id="stuDocsMenu">
                                {/* File input button */}
                                <label className="fileInputLabel" htmlFor="fileInput">
                                    Upload Photo</label>
                                <input type="file" id="fileInput" name="fileInput" style={{ display: "none" }} onChange={(e) => { console.log('Selected photo file:', e.target.files[0]); setPhotoFile(e.target.files[0]) }} />

                                <label className="fileInputLabel" htmlFor="fileInputSign">Upload Sign </label>
                                <input type="file" id="fileInputSign" name="fileInputSign" style={{ display: "none" }} onChange={(e) => setSignFile(e.target.files[0])} />
                            </div>
                        </div>
                    </div>

                    {/* all form main buttons */}
                    <div id="regButtonsForForm">
                        {page > 1 && <button onClick={prev}>Previous</button>}
                        <div></div>
                        {page < 4 ? <button onClick={next}>Next</button> : <button onClick={submitReg}>Submit</button>}
                    </div>
                </div>
            </div>

            {/* Your modal code */}
            {isModalVisible && <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>&times;</span>
                    <p>{alertMessage}</p>
                </div>
            </div>
            }
            {/* Footer */}
            <Footer />
        </>
    );
}

export default Registration;
