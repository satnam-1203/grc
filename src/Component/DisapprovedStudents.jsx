import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import courseMapping from '../utils/Course';
import { API_URL } from '../utils/config';

function DisapprovedStudentDataTable() {
    const [studentData, setStudentData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState();

    const fetchData = async () => {
        try {
            const response = await Axios.get(`${API_URL}/api/getStudentData`);
            setStudentData(response.data);
        } catch (error) {
            console.error('Error fetching student data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
        const pollingInterval = setInterval(fetchData, 2000);
        return () => clearInterval(pollingInterval);
    }, []);

    const handleApproveAndAssign = async (studentId, newVerificationStatus, approve) => {
        try {
            await handleApprove(studentId, newVerificationStatus, approve);
            AssignClass();
        } catch (error) {
            console.error('Error approving and assigning class:', error.message);
        }
    };

    const handleApprove = async (studentId, newVerificationStatus, approve) => {

        try {
            await fetchData();
            const response = await Axios.put(`http://localhost:3001/api/updateVerification/${studentId}`, {
                verification: newVerificationStatus,
                status: approve,
                feeStatus : "no",
            });

            if (response.data.success) {
                fetchData();
                setIsModalVisible(false);
            } else {
                console.error('Error updating verification status:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating verification status:', error.message);
        }
    };


    const disapproveStudent = useMemo(() => studentData.filter(student => student.status === 'Disapproved'), [studentData]);

    const fetchClassData = async () => {
        try {
            const response = await Axios.get(`${API_URL}/getClass`);
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    const openModal = (student) => {
        setSelectedStudent(student);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    //assign class and notification
    const AssignClass = () => {
        try {
            const classData = {
                studentId: selectedStudent.student_id,
                teacherId: selectedClass.teacher_id,
                classId: selectedClass?.class_id,
                batchName: selectedStudent.selected_course,
                batch_year: selectedStudent.selected_year,
                
            }
            Axios.post("http://localhost:3001/assignClass", classData );
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchClassData();
        fetchData();
        const pollingInterval = setInterval(fetchData, 2000);
        return () => clearInterval(pollingInterval);
    }, []);

    return (
        <div>
            <h1>Disapproved Students</h1>
            <div id="tableContent">
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Father's Name</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disapproveStudent.map(student => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.student_name}</td>
                                <td>{student.father_name}</td>
                                <td>{student.gender}</td>
                                <td><i style={{ cursor: "pointer" }} onClick={() => openModal(student)}>Approve</i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isModalVisible && selectedStudent &&
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div><span className="close" onClick={closeModal}>&times;</span></div>
                            <h1>Student Details</h1>
                            <div id="studentData">
                                {Object.entries(selectedStudent).map(([key, value]) => (
                                    <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</p>
                                ))}
                                <p><strong>Selected Course:</strong> {courseMapping[selectedStudent.selected_course]}</p>
                            </div>
                            <div id="modalBtn">
                                <select name="class" id="class" defaultValue="" value={JSON.stringify(selectedClass)} onChange={(e) => setSelectedClass(JSON.parse(e.target.value))}>
                                    <option value="" disabled hidden> Choose Class</option>
                                    {classes.map((classItem) => (
                                        <option key={classItem.class_id} value={JSON.stringify(classItem)}>{classItem.class_group}</option>
                                    ))}
                                </select>
                                <div id="approvalBtn">
                                    <button onClick={() => handleApproveAndAssign(selectedStudent.student_id, "Yes", "Approved")} style={{ width: "150px", marginRight: "10px", background: "green" }}>Approve</button>
                                    {/* <button onClick={() => handleApproveAndAssign(selectedStudent.student_id, "Yes", "Disapproved")} style={{ width: "150px", background: "red" }}>Disapprove</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default DisapprovedStudentDataTable;