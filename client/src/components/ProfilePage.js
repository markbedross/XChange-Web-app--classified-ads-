import React, { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import { useNavigate,  } from "react-router";
import { Link, useParams } from "react-router-dom";
import './profile.css'

function ProfilePage(props) {

  const { user, setUser, ready } = useContext(MainContext);
  const navigate = useNavigate();
  let {subpage} = useParams()

  if (subpage === undefined) subpage = 'profile'

  if (!ready) return "Loading...";

  if (!user) navigate("/login");
  else {
    return (
    <div>
        <div className="nav">
            <Link className="link" to={'/profile'}>My Profile</Link>
            <Link className="link" to={'/profile/myads'}>My Ads</Link>
        </div>
        {subpage === 'profile' && (
            <div className="profile">
               Logged in as: {user.name} ({user.email})
               <button className="logout" onClick={()=>{
                setUser(null)
                localStorage.removeItem('user')
                navigate('/')
                }}>Log Out
            </button>
            </div>
        )}
        {subpage === 'myads' && (
            <div className="myads">
                <button className="createButton" onClick={() => navigate('/create')}>Create new ad</button>
                <div className="ad-list">
                    my places
                </div>
            </div>
        )}
    </div>
    )
  }
}

export default ProfilePage;
