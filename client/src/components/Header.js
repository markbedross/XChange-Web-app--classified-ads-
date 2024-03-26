import "./header.css";
import logo from "../images/sitelogo.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

function Header(props) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(MainContext);

  return (
    <div className="headerContainer">
      <Link to={"/"}>
        <img src={logo} alt="" width="100" height="25" />
      </Link>
      <button className="createButton" onClick={() => navigate("/create")}>
        Post your ad now!
      </button>
      <div style={{ display: "flex", gap: 6 }}>
        <Link to={user ? "/profile" : "/login"} className="login">
          <PersonIcon />
          {user && <div>{user.name}</div>}
        </Link>
      </div>
    </div>
  );
}

export default Header;
