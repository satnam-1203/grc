import '../App.css';
import React, { useState, useEffect } from "react";
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
import Sidebar from "../Component/SideMenu";
import NewStudents from "../Component/NewStudents";
import ApprovedStudents from "../Component/AllStudents";
import DisapprovedStudents from "../Component/DisapprovedStudents";
import StaffDataTable from "../Component/RemoveStaff";
import AddStaffDataTable from "../Component/AddStaff";
import UpdateStaffDataTable from "../Component/UpdateStaff";
import UploadSyllabus from '../Component/UploadSyllabus';
import { getUserRole } from '../utils/Role';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/config';
import FeeDetails from '../Component/FeeDetails';
import AddClass from '../Component/AddClass';

function Management() {
    const [data, setData] = useState();
    const [role, setRole] = useState('');
    const [selectedTab, setSelectedTab] = useState("dashboard");
    // const [redirectToHome, setRedirectToHome] = useState(false);
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get(`${API_URL}/user`).then((response) => {
            try {
                // check if user is logged in
                if (response.data.loggedIn === true) {
                    console.log("ok")
                } else {
                    navigate("/staff-login");
                }
            } catch (err) {
                console.log(err)
            }
        })

    }, [navigate]);

    // Fetch data from the SQL database
    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/getStudentData`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching student data:', error.message);
        }

    };

    // Fetch user role
    const fetchUserRole = async () => {
        const userRole = await getUserRole();
        setRole(userRole);
    };

    // Set up polling with a 10-second interval (adjust as needed)
    useEffect(() => {
        fetchData();
        fetchUserRole();
        const pollingInterval = setInterval(fetchData, 2000);
        return () => clearInterval(pollingInterval);
    }, []);

    const totalApproved = ((data?.filter((student) => student.status === 'Approved').length) || 0);
    const totalDisapproved = ((data?.filter((student) => student.status === 'Disapproved').length) || 0);
    const totalPending = ((data?.filter((student) => student.status === "null").length) || 0);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const managementData = [
        { name: totalPending, iconClass: "", title: "New ", btn: "new_students" },
        { name: totalApproved, iconClass: "", title: "Approved", btn: "all_students" },
        { name: totalDisapproved, iconClass: "", title: "Disapproved", btn: "disapprove_students" },
    ]

    return (
        //  main container of body
        <>
            <TopHeader />
            <Navigation />
            {/* main webpage of contact us div */}
            <div id="PageContainer">
                <Sidebar onTabChange={handleTabChange} />
                {/* contact us section page where all the input tages, button located*/}
                <div className="managementPage">
                    {selectedTab === "dashboard" && (
                        <>
                            <div id="pageTitle">Management</div>
                            <h1 style={{ marginTop: "40px" }}>Students:</h1>
                            <div id="managementBox">
                                {managementData.map((management, index) => (
                                    <div key={index} className="manageBoxCont" onClick={() => handleTabChange(management.btn)}>
                                        <div className="boxIcon" >
                                            <h1>{management.name}</h1>
                                        </div>
                                        <p>{management.title}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {(role === 'teacher' || role === 'admin') && (selectedTab === "new_students") && (
                        <div id="tabContent">
                            <div id="tabData">
                                <NewStudents />
                            </div>

                        </div>
                    )}

                        {/* add classs */}
                    {(role === 'teacher' || role === 'admin') && (selectedTab === "add_class") && (
                        <div id="tabContent">
                            <div id="tabData">
                                <AddClass />
                            </div>

                        </div>
                    )}

                    {(role === 'teacher' || role === 'admin') && (selectedTab === "all_students") && (
                        <div id="tabContent">
                            <div id="tabData">
                                <ApprovedStudents />
                            </div>

                        </div>
                    )}

                    {(role === 'teacher' || role === 'admin') && (selectedTab === "disapprove_students") && (
                        <div id="tabContent">
                            <div id="tabData">
                                <DisapprovedStudents />
                            </div>

                        </div>
                    )}


                    {/* for staff */}

                    {role === 'admin' && selectedTab === "remove_staff" && (
                        <div id="tabContent">
                            <div id="tabData">
                                <StaffDataTable />
                            </div>

                        </div>
                    )}

                    {role === 'admin' && selectedTab === "add_staff" && (
                        <div id="tabContent">
                            <div id="tabData">
                                <AddStaffDataTable />
                            </div>

                        </div>
                    )}

                    {(role === 'teacher' || role === 'admin') && (selectedTab === "update_staff") && (
                        <div id="tabContent">
                            <div id="tabData">
                                <UpdateStaffDataTable />
                            </div>

                        </div>
                    )}

                    {/* update syllabus */}
                    {(role === 'teacher' || role === 'admin') && (selectedTab === "update_syllabus") && (
                        <div id="tabContent">
                            <div id="tabData">
                                <UploadSyllabus />
                            </div>

                        </div>
                    )}

                    {/* fee details */}
                    {(role === 'clerk' || role === 'admin') && (selectedTab === "paid_fee_students") && (
                        <div id="tabContent">
                            <div id="tabData">
                                <FeeDetails />
                            </div>

                        </div>
                    )}

                </div>
                {/* div for sidebar */}
            </div>
            <Footer />
        </>

    );
}

export default Management;