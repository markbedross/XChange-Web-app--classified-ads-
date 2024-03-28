import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import "./profile.css";

function ProfilePage() {
  const { user, setUser, ready, API } = useContext(MainContext);
  const navigate = useNavigate();
  let { subpage } = useParams();
  const [places, setPlaces] = useState([]);
  const [placesLoaded, setPlacesLoaded] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!ready) return;
      const res = await fetch(`${API}/user/ads`, {
        headers: {
          Authorization: `Bearer: ${user.token}`,
        },
      });
      const data = await res.json();
      setPlaces(data);
    };
    fetchPlaces();
    setPlacesLoaded(true);
  }, [placesLoaded]);

  if (subpage === undefined) subpage = "profile";

  if (!ready) return "Loading...";

  if (!user) navigate("/login");
  else {
    return (
      <div>
        <div className="nav">
          <Link className="link" to={"/profile"}>
            My Profile
          </Link>
          <Link className="link" to={"/profile/myads"}>
            My Ads
          </Link>
        </div>
        {subpage === "profile" && (
          <div className="profile">
            Logged in as: {user.name} ({user.email})
            <button
              className="logout"
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              Log Out
            </button>
          </div>
        )}
        {subpage === "myads" && (
          <div className="myads">
            <div className="ad-list">
              {(placesLoaded && places.length > 0) &&
                places.map((place) => (
                  <Link to={`/create/${place._id}`} className="ad" key={place._id}>
                    <div className={"imageBox"}>
                      <img className="adListThumbnail"
                      src={place.photos.length > 0 ? `${API}/uploads/${place.photos[0]}` : `${API}/uploads/no-image.svg`}
                      alt="" />
                    </div>
                    <div className="text">
                      <div>
                        <div className="titlePrice">
                          <div>{place.title}</div>
                          <div>${place.price}</div>
                        </div>
                        <div className="description">{place.description}</div>
                      </div>
                      <div className="location">Location: {place.location}</div>
                    </div>
                  </Link>
                ))}
                {(places.length === 0) && <div style={{alignSelf: 'center', marginTop: 50}}>You have no ads</div>}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProfilePage;
