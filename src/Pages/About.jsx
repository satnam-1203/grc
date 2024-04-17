import '../App.css';
import React from "react";
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";

function About() {
    return (
        <>
            <TopHeader></TopHeader>
            <Navigation></Navigation>

            {/* About section starts here */}
            <div id="PageContainer">
                <div id="aboutSection">
                    <div id="pageTitle">About</div>

                    <p>Welcome to GRC Online Portal, a place of academic excellence and innovation in higher education. Established in 1946, we have been committed to providing quality education, fostering research and development, and shaping the leaders of tomorrow.</p>

                    <p><strong>Our Mission</strong></p>

                    <p>At GRC Online Portal, our mission is to empower students with knowledge, skills, and values that will prepare them for a successful and meaningful life. We strive to create a vibrant learning environment that encourages intellectual curiosity, critical thinking, and a spirit of inquiry.</p>

                    <p><strong>Academic Excellence</strong></p>

                    <p>Our academic programs are designed to meet the highest standards and are taught by a dedicated faculty who are experts in their fields. We offer a diverse range of undergraduate, postgraduate, and doctoral programs, ensuring that students have the opportunity to explore their passions and interests.</p>

                    <p><strong>State-of-the-Art Facilities</strong></p>

                    <p>Equipped with modern infrastructure and state-of-the-art facilities, our campus provides a conducive environment for learning and research. From well-equipped laboratories to extensive libraries and recreational spaces, we strive to create an atmosphere that nurtures holistic development.</p>

                    <p><strong>Research and Innovation</strong></p>

                    <p>We are committed to pushing the boundaries of knowledge through cutting-edge research and innovation. Our faculty and students engage in impactful research projects that contribute to advancements in various fields. We encourage a culture of curiosity and exploration that goes beyond the classroom.</p>

                    <p><strong>Global Perspective</strong></p>

                    <p>With a focus on global education, we provide opportunities for students to engage in international collaborations, exchange programs, and internships. This exposure enhances their cross-cultural understanding and prepares them to thrive in a globally interconnected world.</p>

                    <p><strong>Community Engagement</strong></p>

                    <p>Beyond academics, we emphasize the importance of community service and social responsibility. Our students actively participate in outreach programs, volunteering initiatives, and community development projects, contributing to the betterment of society.</p>

                    <p>Join us at  GRC Online Portal and become part of a dynamic community dedicated to shaping the future. Explore your potential, broaden your horizons, and embark on a transformative educational journey with us.</p>

                    <p>For more information, please feel free to contact us at +9100000-00000.</p>

                </div>
            </div>

            {/* footer section starts here */}
            <Footer />

        </>
    );
}
export default About;