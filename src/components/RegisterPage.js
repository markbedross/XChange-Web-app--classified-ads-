import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

function RegisterPage(props) {
  return (
    <div className="container">
      <h2>Register</h2>
      <form>
        <input type="name" placeholder="Your Name" />
        <input type="email" placeholder="your@email.com" />
        <input type="password" placeholder="password" />
        <button>Login</button>
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
