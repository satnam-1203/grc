import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/config';

function UpdateStaffDataTable() {
    const [staffData, setStaffData] = useState([]);
    const [role, setRole] = useState([]);
    const [gender, setGender] = useState([]);

    useEffect(() => {
        // Fetch data from the SQL database
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/getStaffData`);
                const data = await response.json();
                setStaffData(data, staffData);
            } catch (error) {
                console.error('Error fetching student data:', error.message);
            }
        };

        fetchData();
    }, [staffData]);

    return (
        <div>
            <h1>Update Staff Member</h1>
            <div id="staffContent">
                <div id="addStaffInput">
                    <input type='text' placeholder='Staff ID' />
                    <input type='text' placeholder='Qualification' />
                    <input
                        type="text"
                        placeholder="DD-MM-YYYY"
                        pattern="\d{1,2}-\d{1,2}-\d{4}"
                        title="Please enter the date in the format DD-MM-YYYY"
                    />
                    <input type='text' placeholder='Phone Number' />
                    <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} defaultValue="">
                        <option value="" disabled hidden>Role</option>
                        <option value="teacher">Teacher</option>
                        <option value="hod">Head of Department</option>
                        <option value="cleark">Cleark</option>
                    </select>

                    <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} defaultValue="">
                        <option value="" disabled hidden>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div id="StaffSectionButton">
                    <button>Update</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateStaffDataTable;