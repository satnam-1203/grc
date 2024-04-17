import React, { useState } from 'react';
import { API_URL } from '../utils/config';
import Axios from "axios";

function AddClass() {
    const [courseData, setCourseData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [courseId, setCourseId] = useState(''); // State to store course ID
    const [teacher, setTeacher] = useState('');
    const [classGroup, setClassGroup] = useState('');

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedCourse('');
        setCourseData([]); // Clear course data when category changes

        if (category) {
            Axios.post(`${API_URL}/api/getCourses`, { category })
                .then((response) => {
                    setCourseData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching courses:', error.message);
                });
        }
    };

    const handleCourseChange = (e) => {
        const courseName = e.target.value;
        const courseId = courseData.find(course => course.course_name === courseName)?.course_id; // Find the course ID based on the selected course name
        setSelectedCourse(courseName);
        setCourseId(courseId);
    };

    const submit = () => {
        if (!selectedCategory || !selectedCourse || !selectedYear || !teacher || !classGroup || !courseId) {
           alert('All fields are required');
            return; // Exit early if any field is empty
        }

        const newClass = selectedCourse + ' ' + selectedYear;

        const postData = {
            courseName: newClass,
            courseId: courseId,
            teacher: teacher,
            classGroup: classGroup
        }

        Axios.post(`${API_URL}/addClass`, postData)
            .then(res => {
                alert('Class Added');
            })
            .catch(error => {
                console.error('Error adding class:', error);
            });
    }

    return (
        <div>
            <h1>Add Class</h1>
            <div id="staffContent">
                <div id="addStaffInput">
                    <input type="text" value={teacher} onChange={e => setTeacher(e.target.value)} placeholder="Enter Teacher Id" />
                    <input type="text" value={classGroup} onChange={e => setClassGroup(e.target.value)} placeholder="Group Name" />

                    <select name="courseCategory" id="courseCategory" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Select Course Type</option>
                        <option value="ug">UG</option>
                        <option value="pg">PG</option>
                        <option value="diploma">Diploma</option>
                    </select>

                    <select name="department" id="department" style={{ visibility: selectedCategory ? 'visible' : 'hidden', marginBottom: '50px' }} value={selectedCourse} onChange={handleCourseChange}>
                        <option value="">Select Course Name</option>
                        {courseData.map(course => (
                            <option key={course.course_id} value={course.course_name}>{course.course_name}</option>
                        ))}
                    </select>

                    <select name="year" id="year" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        <option value="">Select Year</option>
                        <option value="first">1st Year</option>
                        <option value="second">2nd Year</option>
                        <option value="third">3rd Year</option>
                        <option value="fourth">4th Year</option>
                    </select>
                </div>

                <div id="StaffSectionButton">
                    <button onClick={submit}>Add Class</button>
                </div>
            </div>
        </div>
    );
}

export default AddClass;
