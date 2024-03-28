import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import './home.css'
import { Link } from "react-router-dom";

function HomePage(props) {

  const { API } = useContext(MainContext);
  const [ads, setAds] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/ads`);
      const data = await response.json()
      console.log(data)
      setAds(data)
    };

    fetchData()
  }, []);

  return(
  <div className="homeContainer">
    {ads && ads.map((item)=>(
      <Link to={'/ad/' + item._id} className="homeAd" key={item._id}>
        <div className="homeImgContainer">
          <img className="homeImg"
          src={item.photos.length > 0 ? `${API}/uploads/${item.photos[0]}` : `${API}/uploads/no-image.svg`}
          alt="" />
        </div>
        <h2 className="homeAdTitle">{item.title}</h2>
        <h3 className="homeAdLocation">{item.location}</h3>
        <h3 className="homeAdPrice">${item.price}</h3>
      </Link>
    ))}
  </div>
  )
}

export default HomePage;
