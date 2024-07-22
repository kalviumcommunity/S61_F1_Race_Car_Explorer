import axios from "axios";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Logout() {
  const [newUser, setNewUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e, field) => {
    setNewUser({ ...newUser, [field]: e.target.value });
  };

  const handleValidation = () => {
    const errors = {};
    if (newUser.fullname.length < 5) {
      errors.fullname = "Full name must be at least 5 characters long.";
    }
    if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Invalid email address.";
    }
    if (newUser.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/logout",
          {
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
          }
        );
        console.log("Response:", response.data);
        Cookies.set("username", newUser.username);

        // Redirect or perform any other actions upon successful registration
      } catch (error) {
        console.error("Error:", error);
        // Handle errors, such as displaying error messages to the user
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div>
      <h3>Log Out</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Full name:
          <input
            type="text"
            value={newUser.fullname}
            onChange={(e) => handleChange(e, "fullname")}
          />
        </label>
        <label>
          User name:
          <input
            type="text"
            value={newUser.username}
            onChange={(e) => handleChange(e, "username")}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => handleChange(e, "password")}
          />
        </label>
        <button type="submit">Log Out</button>
      </form>
      <p>
        Already registered? <a href="/login">Sign in</a>
      </p>
    </div>
  );
}

export default Logout;
