import '../App.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../utils/config';

function Logout() {

    const navigate = useNavigate();

    const logot = async () => {
        try {
            Axios.get(`${API_URL}/logout`).then(res => {
            })
            navigate("/");

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        //  main container of body
        <div style={{ cursor: "pointer" }} onClick={logot}>Logout</div>
    );
}

export default Logout;