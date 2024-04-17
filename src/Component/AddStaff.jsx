import axios from 'axios';
import React, { useState} from 'react';
import { API_URL } from '../utils/config';

function AddStaffDataTable() {
    const [staffName, setStaffName] = useState([]);
    const [qualification, setQualification] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [dob, setDob] = useState([]);
    const [role, setRole] = useState([]);
    const [gender, setGender] = useState([]);
    const [sucessMessage, setSucessMessage] = useState("");

    // Fetch data from the SQL database
    const AddStaff = async () => {
        const Data = { staffName, qualification, phoneNumber, dob, role, gender };
        try {
            const res = await axios.post(`${API_URL}/api/AddStaffData`, {Data});

            if(res.data.success){
                setSucessMessage(res.data.message)
            }

        } catch (error) {
            console.error('Error fetching student data:', error.message);
        }
    };


    return (
        <div>
            <h1>Add New Staff Member</h1>
            <div id="staffContent">
                <div id="addStaffInput">
                    <input type='text' value={staffName} placeholder='Staff Name' onChange={(e) => setStaffName(e.target.value)} />
                    <input type='text' value={qualification} placeholder='Qualification' onChange={(e) => setQualification(e.target.value)} />
                    <input
                        type="text"
                        placeholder="DD-MM-YYYY"
                        pattern="\d{1,2}-\d{1,2}-\d{4}"
                        title="Please enter the date in the format DD-MM-YYYY"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                    <input type='text' placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} defaultValue="">
                        <option value="" disabled hidden>Role</option>
                        <option value="admin">Admin</option>
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
                    <button onClick={AddStaff}>Add Staff</button>
                </div>

            {sucessMessage && <div style={{color:"Green", fontSize:"22px", marginTop:"20px"}}>{sucessMessage}</div>}
            </div>
        </div>
    );
}

export default AddStaffDataTable;
