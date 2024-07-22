import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, field) => {
    e.preventDefault();
    setLoginUser({ ...loginUser, [field]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: loginUser.email,
        password: loginUser.password,
      });
      console.log("response", response);
      if (response.status === 200) {
        console.log(response.data);
        // Save the email in a cookie
        Cookies.set('userEmail', loginUser.email);
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred while logging in', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={loginUser.email}
          onChange={(e) => handleChange(e, "email")}
        />
        <label>Password:</label>
        <input
          type="password"
          value={loginUser.password}
          onChange={(e) => handleChange(e, "password")}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
