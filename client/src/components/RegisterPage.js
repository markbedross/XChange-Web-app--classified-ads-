import React, { useState, useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { API, setUser } = useContext(MainContext);
  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault();

    setError(null);

    const res = await fetch(`${API}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("res not ok: " + data.error);
      setError(data.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate('/')
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form className="login-form" onSubmit={(e) => registerUser(e)}>
        <input
          className="loginInput"
          type="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="loginInput"
          type="text"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="loginInput"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton">Register</button>
        {error && <div className="login-error">{error}</div>}
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
