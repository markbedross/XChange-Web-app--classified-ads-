import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    setError(null)

    const res = await fetch(`${props.API}/login`, {
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
      setIsLoading(false)
      console.log("res not ok: " + data.error)
      setError(data.error)
    } else {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      setIsLoading(false)
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={e => login(e)}>
        <input
          type="text"
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
        <button>Login</button>
        {error && <div className="error">{error}</div> }
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
