import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import './home.css'
import { Link } from "react-router-dom";
import noImg from "../images/no-image.svg";

function HomePage(props) {

  const { API } = useContext(MainContext);
  const [ads, setAds] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/ad/ads`);
      const data = await response.json()
      console.log(data)
      setAds(data)
    };

    fetchData()
  }, []);

  return(
  <div className="homeContainer">
    {ads ? ads.map((item)=>{
      console.log(item)
      return (
        <Link to={'/ad/' + item._id} key={item._id}>
          <div className="homeImgContainer">
            <img className="homeImg"
            src={item.photos.length > 0 ? item.photos[0] : noImg}
            alt="" />
          </div>
          <h2 className="homeAdTitle">{item.title}</h2>
          <h3 className="homeAdLocation">{item.location}</h3>
          <h3 className="homeAdPrice">${item.price}</h3>
        </Link>
      )
    })
    :
    <div>Loading...</div>
    }
  </div>
  )
}

export default HomePage;
