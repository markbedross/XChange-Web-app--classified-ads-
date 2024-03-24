import "./header.css";
import logo from "../images/sitelogo.png";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Header(props) {

  useEffect(()=> {if(props.user) console.log("header", props.user)}, [props.user])

  return (
    <div className="headerContainer">
      <Link to={"/"}>
        <img src={logo} alt="" width="100" height="25" />
      </Link>
      <div className="centerWidget" style={{ display: "flex" }}>
        <div style={{alignSelf: 'center'}}>Location</div>
        <div
          style={{
            margin: 3,
            border: '1px solid lightgrey'
          }}
        ></div>
        <div style={{alignSelf: 'center'}}>Create</div>
        <div
          style={{
            margin: 3,
            border: '1px solid lightgrey'
          }}
        ></div>
        <div className="search-container">
          <SearchIcon className="search" fontSize={'small'}/>
        </div>
      </div>
      <Link to={'/login'} className="login">
        <MenuIcon  style={{marginRight: 5}}/>
        <PersonIcon />
      </Link>
      {props.user &&
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        {props.user.email}
        <button onClick={()=>{
          props.setUser(null)
          localStorage.removeItem('user')
          }}>Log Out</button>
      </div>}
    </div>
  );
}

export default Header;
