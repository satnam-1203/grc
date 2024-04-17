import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/config';

function StaffDataTable() {
    const [staffData, setStaffData] = useState([]);

    useEffect(() => {
        // Fetch data from the SQL database
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/getStaffData`);
                const data = await response.json();
                setStaffData(data);
            } catch (error) {
                console.error('Error fetching student data:', error.message);
            }
        };

        fetchData();
    }, []);

    const removeStaffMember = async (staffId) => {
        try {
            const response = await fetch(`${API_URL}/api/deleteStaff/${staffId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // If the delete operation was successful, update the staffData state
                setStaffData(prevStaffData => prevStaffData.filter(staff => staff.staff_id !== staffId));
            } else {
                console.error('Error deleting staff member:', response.statusText);
            }
        } catch (error) { 
            console.error('Error deleting staff member:', error.message);
        }
    };

    return (
        <div>
            <h1>Remove Staff</h1>
            <div id="tableContent" style={{overflowX:"scroll"}}>
                <table>
                    {/* <thead> */}
                    <tr>
                        <th>Staff ID</th>
                        <th>Staff Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Staff Role</th>
                        <th>Action</th>
                    </tr>
                    {staffData.map(staff => (
                        <tr key={staff.staff_id}>
                            <td>{staff.staff_id}</td>
                            <td>{staff.name}</td>
                            <td>{staff.dob}</td>  
                            <td>{staff.gender}</td>
                            <td>{staff.phone_num}</td> 
                            <td>{staff.role}</td>
                            <td> <p style={{cursor:"pointer"}} onClick={() => removeStaffMember(staff.staff_id)}>remove</p></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default StaffDataTable;
