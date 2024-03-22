import "./header.css";
import logo from "../images/sitelogo.png";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

function Header(props) {
  return (
    <div className="headerContainer">
      <a href="/">
        <img src={logo} alt="" width="100" height="25" />
      </a>
      <div className="centerWidget" style={{ display: "flex" }}>
        <div>Location</div>
        <div
          style={{
            margin: 3,
            border: '1px solid lightgrey'
          }}
        ></div>
        <div>Create</div>
        <div
          style={{
            margin: 3,
            border: '1px solid lightgrey'
          }}
        ></div>
        <SearchIcon className="search" fontSize={'small'}/>
      </div>
      <div class="login">
        <MenuIcon  style={{marginRight: 5}}/>
        <PersonIcon />
      </div>
    </div>
  );
}

export default Header;
