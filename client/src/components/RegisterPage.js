import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const registerUser = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    setError(null)

    const res = await fetch(`${props.API}/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
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
        {error && <div className="error">{error}</div> }
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
