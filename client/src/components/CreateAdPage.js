import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./createAd.css";
import DeleteIcon from '@mui/icons-material/Delete';

function CreateAdPage(props) {
  const { user, ready, API } = useContext(MainContext);
  const navigate = useNavigate();
  let { subpage, id } = useParams();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getAdId = async () => {
      if (id && ready) {
        const res = await fetch(`${API}/createAd/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer: ${user.token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.log(data.error);
          navigate("/profile/myad");
        } else {
          console.log("get ad: ", data);
          setTitle(data.title);
          setLocation(data.location);
          setPhotos(data.photos);
          setDescription(data.description);
          setPrice(data.price);
        }
      }
    };

    getAdId();
  }, [ready]);

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const filelist = new FormData();
    for (let i = 0; i < files.length; i++) {
      filelist.append("photos", files[i]);
    }
    axios
      .post(`${API}/upload`, filelist, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer: ${user.token}`,
        },
      })
      .then((res) => {
        setPhotos((prev) => {
          return [...prev, ...res.data];
        });
      })
      .catch((err) => setError(err.response.data.error));
  };

  const createAd = async (e) => {
    e.preventDefault();

    const ad = {
      title,
      location,
      photos,
      description,
      price,
    };

    let res;

    if (id) {
      console.log("if true")
      res = await fetch(`${API}/createAd/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer: ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id, ...ad}),
      });
    } else {
      console.log("if false")
      res = await fetch(`${API}/createAd`, {
        method: "POST",
        headers: {
          Authorization: `Bearer: ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ad),
      });
    }

    const data = await res.json();

    if (!res.ok) {
      console.log("res not ok: " + data.error);
      setError(data.error);
    } else {
      navigate("/profile/myads");
    }
  };

  const removePhoto = (link) => {
    setPhotos(prev => prev.filter(photo => photo !== link))
  }

  const selectMainPic = (link) => {
    setPhotos([link, ...photos.filter(photo => photo !== link)])
  }

  if (subpage === undefined) subpage = "profile";

  if (!ready) return "Loading...";

  if (!user) navigate("/login");

  return (
    <div className="createAdContainer">
      <form className="createAdForm" onSubmit={(e) => createAd(e)}>
        <h3 className="createAdHeader">Title</h3>
        <input
          value={title}
          className="createAdInput"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3 className="createAdHeader">Location</h3>
        <input
          value={location}
          className="createAdInput"
          type="text"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <h3 className="createAdHeader">Photos</h3>
        <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
        {photos.length > 0 &&
            photos.map((link, index) => (
              <div style={{position: 'relative'}}>
                <img
                  key={link}
                  className={index == 0 ? "first thumbnail" :"thumbnail"}
                  src={`${API}/uploads/${link}`}
                  alt=""
                  onClick={() => selectMainPic(link)}
                />
                <div onClick={()=>{removePhoto(link)}}>
                  <DeleteIcon className="deleteIcon"/>
                </div>
              </div>
            ))}
          <label className="uploadButton">
            <input
              multiple
              onChange={(e) => uploadPhoto(e)}
              type="file"
              style={{ display: "none" }}
            />
            Upload
          </label>
        </div>
        <h3 className="createAdHeader">Description</h3>
        <textarea
          value={description}
          className="createAdInput"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <h3 className="createAdHeader">Price</h3>
        <input
          value={price}
          className="createAdInput"
          type="tex5"
          placeholder="10"
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && <div className="login-error">{error}</div>}
        <button className="createAdButton">{id ? "Update" : "Post"} ad</button>
      </form>
    </div>
  );
}

export default CreateAdPage;
