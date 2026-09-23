import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error) {
      alert(json.error);
    }
  };

  return (
    <div className="register_container">
      <h2>Sign Up</h2>
      <form onSubmit={register}>
        <div className="input_field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input_field">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input_field">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input_field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input_field">
          <label>Password</label>
          <input
            type="password"
            name="psw"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input className="submit_button" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;
