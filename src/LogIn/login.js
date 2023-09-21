import React, { useState} from "react";
import {useNavigate} from 'react-router-dom';
import "./login.css";
import { useAuth } from "../Provider/authProvider"; 

var logo = require("./PagaarLogo.png");

function Login() {
  const navigate = useNavigate();
  const {setToken} = useAuth(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    setUsername(e.target.value); 
  }

  function handleChange2(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();
    let item = { username, password };

    
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      setToken(token);
      navigate('/');
    } else {
     
      console.error("Authentication failed");
    }
  }

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">
          <img src={logo} alt="Pagaar.logo" />
        </div>
        <div className="form">
          <form>
            <div className="input-container">
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={handleChange2}
              />
            </div>
            <div className="button-container">
              <button className="loginButton" onClick={handleLogin}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;