import '../App.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import TopHeader from "../Component/TopHeader";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
import { API_URL } from '../utils/config';

function Login() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await Axios.post(`${API_URL}/stafflogin`, { staffId, password }, { withCredentials: true });

    if (response.data.auth) {
      navigate("/management");
    } else {
      setMsg(response.data.message);
    }
  };

  return (
    <>
      <TopHeader />
      <Navigation />
      <div id="PageContainer">
        <div id="form-container">
          <p>Login</p>
          <div className="input-box">
            <input type="text" name="staffId" value={staffId} onChange={(e) => setStaffId(e.target.value)} placeholder="ID" />
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>

          <div id="form-button">
            <button onClick={handleLogin}>Login</button>
            <div style={{ marginTop: "7px", textAlign: "center", color: "red" }}>{msg ? msg : "‎ "}</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
