import React, { useState, useEffect, useMemo } from 'react';
import { API_URL } from '../utils/config';

function AllStudentDataTable() {
    const [studentData, setStudentData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/getStudentData`);
                const data = await response.json();
                setStudentData(data);
            } catch (error) {
                console.error('Error fetching student data:', error.message);
            }
        };

        fetchData();

        const pollingInterval = setInterval(fetchData, 2000);
        return () => clearInterval(pollingInterval);
    }, []);

    const approveStudent = useMemo(() => studentData.filter(student => student.status === 'Approved'), [studentData]);

    const openModal = (student) => {
        setSelectedStudent(student);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <h1>All Students</h1>
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
                        {approveStudent.map(student => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.student_name}</td>
                                <td>{student.father_name}</td>
                                <td>{student.gender}</td>
                                <td><i style={{ cursor: "pointer" }} onClick={() => openModal(student)}>view</i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isModalVisible && selectedStudent &&
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div><span className="close" onClick={closeModal}>&times;</span></div>
                            <div><h1>Student Details</h1>
                                <div id="studentData">
                                    {Object.entries(selectedStudent).map(([key, value]) => (
                                        key !== 'photo' && key !== 'sign' && (
                                            <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default AllStudentDataTable;