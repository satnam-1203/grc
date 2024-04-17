import '../App.css';
import React from "react";
// import {Routes, Route, useNavigate} from 'react-router-dom';
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
// import Sidebar from "../Component/Sidebar";

function Contact() {

    return (
        //  main container of body
        <>
            <TopHeader />
            <Navigation />
            {/* main webpage of contact us div */}
            <div id="PageContainer">
                {/* contact us section page where all the input tages, button located*/}
                <div className="cusPageForm">
                    <div id="pageTitle">Contact Us</div>

                    <div className="contactUsInputForm">
                        <div id="contactUsinput">
                            <input type="name" name="name" placeholder="Name" />
                            <input type="text" name="text" placeholder="Subjet" />
                            <input type="email" name="email" placeholder="Email" />
                        </div>

                        <div id="contactUsinput2">
                            <textarea id="txtarea" placeholder="Write your message..."></textarea>

                        </div>

                        <div id="contactUsinput3">
                        <button>Submit</button>
                        </div>

                    </div>
                </div>
                {/* div for sidebar */}
            </div>
            <Footer />
        </>

    );
}

export default Contact;