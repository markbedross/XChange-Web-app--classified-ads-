import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const {API, user, setUser} = useContext(MainContext)

  const navigation = useNavigate()

  const login = async (e) => {
    e.preventDefault();

    setError(null)

    console.log(API)
    const res = await fetch(`${API}/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    
    const data = await res.json()

    if (!res.ok){
      console.log("res not ok: " + data.error)
      setError(data.error)
    } else {
      console.log("login", data)
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    }
  };

  useEffect(()=>{
    if (user) navigation('/')
  })

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={e => login(e)}>
        <input className="loginInput"
          type="text"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="loginInput"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton">Login</button>
        {error && <div className="login-error">{error}</div> }
        <div style={{ color: "grey", fontSize: 14 }}>
          Don't have an account yet?&nbsp;
          <Link to={"/register"} style={{ color: "#f5385d" }}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
