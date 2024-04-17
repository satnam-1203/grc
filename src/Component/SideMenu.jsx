import '../App.css';
import React from "react";

function Sidebar({ onTabChange }) {

    return (
        <>
            {/* About section starts here */}
            <div id="sideBarContainer">
                <div id="tab">
                    <p style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => onTabChange("dashboard")}>DashBoard</p>
                    <p>Students</p>
                    <ul>
                        <li onClick={() => onTabChange("new_students")}>New Student Registratons</li>
                        <li onClick={() => onTabChange("all_students")}>All Students</li>
                        <li onClick={() => onTabChange("disapprove_students")}>Disapproved Students</li>
                    </ul>
                </div>

                <div id="tab">
                    <p>Couses</p>
                    <ul>
                        <li onClick={() => onTabChange("update_syllabus")}>Syllabus</li>
                        <li onClick={() => onTabChange("add_class")}>Add Class</li>
                    </ul>
                </div>

                <div id="tab">
                    <p>Fee Details</p>
                    <ul>
                        <li onClick={() => onTabChange("paid_fee_students")}>Fee</li>
                    </ul>
                </div>

                <div id="tab">
                    <p>User Auth</p>
                    <ul>
                        <li onClick={() => onTabChange("add_staff")}>Add New User</li>
                        <li onClick={() => onTabChange("update_staff")}>Update User</li>
                        <li onClick={() => onTabChange("remove_staff")}>Remove user</li>
                    </ul>
                </div>
            </div >

        </>
    );
}
export default Sidebar;