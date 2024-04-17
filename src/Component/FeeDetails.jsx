import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_URL } from '../utils/config';

function FeeDetails() {
    const [feeAndStudentData, setFeeAndStudentData] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rollno, setRollno] = useState();

    useEffect(() => {
        // Fetch fee and student data when the component mounts
        Axios.get(`/getFeeAndStudentData`)
            .then(response => {
                setFeeAndStudentData(response.data.feeAndStudentData);
            })
            .catch(error => {
                console.error('Error fetching fee and student data:', error);
            });
    }, []);

    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const submit = (studentId) => {
        if (!rollno) {
            alert('Roll number cannot be empty');
            return; // Exit the function
        }

        Axios.put(`${API_URL}/api/updateStudentAndFee/${studentId}`, {
            rollNo: rollno,
            status: 'approved',
        })
            .then(response => {
                console.log("Roll number updated successfully!");
                setIsModalVisible(false); // Close the modal after successful submission
            })
            .catch(error => {
                console.error('Error updating roll number:', error);
            });
    };


    return (
        <div>
            <h1>Fee Transactions</h1>
            <div id="tableContent">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Method of Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feeAndStudentData.map(transaction => {
                            // Filter out transactions with status "approved"
                            if (transaction.status === "approved") {
                                return null; // Skip rendering this transaction
                            }
                            return (
                                <tr key={transaction.transaction_id}>
                                    <td>{transaction.transaction_id}</td>
                                    <td>{transaction.fee}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.payment_method}</td>
                                    <td><p onClick={() => openModal(transaction)}>View More</p></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {isModalVisible && selectedTransaction && (
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div><span className="close" onClick={closeModal}>&times;</span></div>
                            <div>
                                <h1 style={{ marginBottom: "10px" }}>Transaction Details</h1>
                                <div id="transcactionData">
                                    <p><strong>Transaction ID:</strong> {selectedTransaction.transaction_id}</p>
                                    <p><strong>Student Name:</strong> {selectedTransaction.student_name}</p>
                                    <p><strong>Father's Name:</strong> {selectedTransaction.father_name}</p>
                                    <p><strong>Amount:</strong> {selectedTransaction.fee}</p>
                                    <p><strong>Date:</strong> {selectedTransaction.date}</p>
                                    <p><strong>Payment Method:</strong> {selectedTransaction.payment_method}</p>
                                    <p><strong>Phone Num:</strong> {selectedTransaction.phone_num}</p>
                                    <p><strong>Gender:</strong> {selectedTransaction.gender}</p>
                                </div>
                            </div>
                            <div id="modalBtn">
                                <input type="number" onChange={(e) => setRollno(e.target.value)} placeholder="Assign Roll no." style={{ width: "170px" }} />
                                <input hidden />
                                <button onClick={() => submit(selectedTransaction.student_id)} style={{ width: "170px" }}>Approve</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeeDetails;
