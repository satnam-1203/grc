import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_URL } from '../utils/config';

function StudentSyllabus() {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/getSyllabusContent`, { withCredentials: true })
            .then(response => {
                if (response.data.stuloggedIn === true) {
                    setContent(response.data.content);
                } else {
                    setError('Unauthorized access');
                    // navigate('/');
                }
            })
            .catch(error => {
                console.error('Error fetching syllabus content:', error);
                setError('An error occurred while fetching the syllabus content');
                // navigate('/');
            });
    }, [navigate]);

    return (
        <div style={{ border: "1px solid black" }}>
            {error(<p> {error} </p>)}
            {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
                <p>No syllabus content found.</p>
            )}
        </div>
    );
}

export default StudentSyllabus;
