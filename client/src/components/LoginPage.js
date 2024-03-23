import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <h2>Login</h2>
      <form>
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
        <button>Login</button>
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
