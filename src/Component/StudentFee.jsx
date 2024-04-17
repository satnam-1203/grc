import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../axios";
// import courseMapping from '../utils/Course';
import { API_URL } from '../utils/config';

function StudentSyllabus() {
    const [content, setContent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/getSyllabusContent`, { withCredentials: true })
            .then(response => {
                if (response.data.stuloggedIn === true) {
                    setContent(response.data.content);
                    console.log(response.data.content);
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error('Error fetching student details:', error.message);
            });
    }, [navigate]);

    return (
        <div style={{border:"1px solid black"}}>
             <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    );
}

export default StudentSyllabus;