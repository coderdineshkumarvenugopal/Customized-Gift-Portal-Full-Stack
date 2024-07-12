import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Loginform() {
  const [popupStyle, setPopupStyle] = useState('hide');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogSuccess, setIsLogSuccess] = useState(false);
  const navigate = useNavigate();
  const popup = () => {
    setPopupStyle('login-popup');
    setTimeout(() =>{
      setPopupStyle('hide');
      navigate('/gift-shop');
    }, 3000);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    axios
      .get(`http://127.0.0.1:8096/verify-login?name=${username}&password=${password}`)
      .then((response) => {
        const isAUser = response.data;
        if (isAUser === 1) {
          setIsLogSuccess(true);
          popup();
        } else {
          setIsLogSuccess(false);
          popup();
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  return (
    <div className='page'>
      <div className='cover'>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='Username'
          className='tex1'
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='tex2'
          value={password}
          onChange={handlePasswordChange}
        />

        <div className='login-btn' onClick={handleSubmit}>
          Login
        </div>
        {isLogSuccess ? (
          <div className={popupStyle}>
            <h2>Login Successful</h2>
          </div>
        ) : (
          <div className={popupStyle}>
            <h2>Login Failed</h2>
            <p>Username Or Password Invalid</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loginform;