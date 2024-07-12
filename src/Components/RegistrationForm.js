import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./RegistrationForm.css";

function RegistrationForm (){
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_no, setMobileNo] = useState('');
  
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const data = [{
      name,
      address,
      mobile_no,
      password,
    }];
    try {
      axios.post('http://127.0.0.1:8096/register', data);
       navigate('/gift-shop')
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="form-container">
      <div className='Container-1'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <p>UserName</p>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <p>Adress</p>
          <input
            type="text"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />
          <p>Mobile No :</p>
          <input
            type="text"
            placeholder="Enter mobile number"
            onChange={(e) => setMobileNo(e.target.value)}
            value={mobile_no}
            required
          />
          <button type="submit">Register</button>
        </form>
        <span>
          <p>Already have an Account?<i><Link to="/login">Login</Link></i></p>
        </span>
      </div>
    </div>
  );
};

export default RegistrationForm ;