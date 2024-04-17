import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { API_URL } from '../utils/config';
import Axios from "axios";
import courseMapping from '../utils/Course';

function UploadSyllabus() {
    const [courseData, setCourseData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedCourse, setSelectedCourse] = useState();
    const [courseId, setCourseId] = useState(); // State to store course ID
    const [syllabusContent, setSyllabusContent] = useState();
    const [selectedYear, setSelectedYear] = useState('');
    const [classData, setClassData] = useState([]);
    const [selectedClassGroup, setSelectedClassGroup] = useState("");
    const [classId, setClassId] = useState("");

    const validateInputs = () => {
        const errors = [
            !courseId && 'course',
            !selectedYear && 'year',
            !syllabusContent && 'syllabus content',
            !selectedCategory && 'course category',
            !selectedCourse && 'course name',
        ].filter(Boolean);

        if (errors.length) {
            alert(`Please select or enter: ${errors.join(', ')}`);
            return false;
        }
        return true;
    };

    useEffect(() => {
        Axios.get(`${API_URL}/getClass`).then(response => {
            setClassData(response.data);
            console.log(response.data)
        })
    }, [])

    const uploadSyllabus = () => {

        if (!validateInputs()) {
            return;
        }

        const courseName = selectedCourse + " " + selectedYear;
        const postData = {
            classId,
            courseId, // Use courseId instead of selectedCourse
            courseName,
            syllabusContent
        };

        try {
            Axios.post(`${API_URL}/uploadSyllabus`, postData)
                .then(res => {
                    if (res.data.success === false) {
                        alert(res.data.message);
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error uploading syllabus:', error.message);
                });
        } catch (error) {
            console.error('Error uploading syllabus:', error.message);
        }
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedCourse("");

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

    
    const handleClassGroupChange = (e) => {
        setSelectedClassGroup(e.target.value);
        const selectedClass = classData.find(classs => classs.class_group === e.target.value);
        if (selectedClass) {
            const classid = selectedClass.class_id;
            setClassId(classid)
        }
    };

    const handleCourseChange = (e) => {
        const courseName = e.target.value;
        const courseId = courseData.find(course => course.course_name === courseName)?.course_id; // Find the course ID based on the selected course name
        setSelectedCourse(courseName);
        setCourseId(courseId);
    };

    return (
        <div>
            <h1>Add / Update Syllabus</h1>
            <div id="staffContent">
                <div id="addStaffInput">
                    <select name="courseCategory" id="courseCategory" defaultValue="" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="" disabled hidden>Course Type</option>
                        <option value="ug">UG</option>
                        <option value="pg">PG</option>
                        <option value="diploma">Diploma</option>
                    </select>

                    <select name="year" id="year" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        <option value="">Select Year</option>
                        <option value="first">1st Year</option>
                        <option value="second">2nd Year</option>
                        <option value="third">3rd Year</option>
                        <option value="fourth">4th Year</option>
                    </select>

                    <select name="department" id="department" style={{ visibility: selectedCategory ? 'visible' : 'hidden', marginBottom: "50px" }} defaultValue="" value={selectedCourse} onChange={handleCourseChange}>
                        <option value="" disabled hidden>Course Name</option>
                        {selectedCategory && (courseData.map((course) => (
                            <option key={course.course_id} value={course.course_name}>{course.course_name}</option>
                        ))
                        )}
                    </select>

                    <select name="class_group" id="class_group" defaultValue="" value={selectedClassGroup} onChange={handleClassGroupChange}>
                        <option value="" disabled hidden>Class Group</option>
                        {classData.map((classs) => (
                            <option key={classs.class_id} value={classs.class_group}> {courseMapping[classs.class_name]}  ({classs.class_group}) </option>
                        ))}
                    </select>


                    <CKEditor
                        editor={ClassicEditor}
                        value={syllabusContent}
                        data=""
                        onReady={(editor) => {
                            // console.log("CKEditor5 React Component is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setSyllabusContent(data)
                            console.log({ event, editor, data });
                        }}
                        className="custom-ckeditor"
                    />
                </div>

                <div id="StaffSectionButton">
                    <button onClick={uploadSyllabus}>Add Syllabus</button>
                </div>
            </div>
        </div >
    );
}

export default UploadSyllabus;
