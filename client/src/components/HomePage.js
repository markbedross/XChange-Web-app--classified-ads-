import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import './home.css'

function HomePage(props) {

  const { API, user, ready } = useContext(MainContext);
  const [ads, setAds] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/ads`, {
        headers: {
          'Authorization': `Bearer: ${user.token}`,
        },
      });
      const data = await response.json()
      console.log(data)
      setAds(data)
    };

    if (ready) fetchData()
  }, [ready]);

  return(
  <div className="homeContainer">
    {ads && ads.map((item)=>(
      <div className="homeAd" key={item._id}>
        <div className="homeImgContainer">
          <img className="homeImg"
          src={item.photos.length > 0 ? `${API}/uploads/${item.photos[0]}` : `${API}/uploads/no-image.svg`}
          alt="" />
        </div>
        <h2 className="homeAdTitle">{item.title}</h2>
        <h3 className="homeAdLocation">{item.location}</h3>
        <h3 className="homeAdPrice">${item.price}</h3>
      </div>
    ))}
  </div>
  )
}

export default HomePage;
