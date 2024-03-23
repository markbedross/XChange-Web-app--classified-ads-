import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    fetch(`${props.API}/register`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={(e) => registerUser(e)}>
        <input
          type="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
        <div style={{ color: "grey", fontSize: 14 }}>
          Already have an account?&nbsp;
          <Link to={"/login"} style={{ color: "#f5385d" }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
