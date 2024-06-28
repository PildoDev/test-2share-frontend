import React, { useState } from "react";
import "../auth.css";
import "./register.css";

const Register: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("Fullname:", fullname);
    // console.log("Email:", email);
    // console.log("Password:", password);

    fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullname, email, password }),
    })
    .then((response) => {
      // console.log("Response:",response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Data:",data);
      alert(data.message);
      if(data.data){
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      alert("An error occurred. Please try again later.");
    });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>2Share</h2>
        <h4>Register</h4>
        <div className="form-group">
          <label htmlFor="fullname">Full name:</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div className="form-group s2">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <div className="under-options-auth">
          <span>Already have an account? </span>
          <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
