import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";

function HomePage(props) {

  const { API, user, setUser } = useContext(MainContext);
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/home`, {
        headers: {
          'Authorization': `Bearer: ${user.token}`,
        },
      });
      const data = await response.json()
      console.log("home rend")
      setData(data.test)
    };

    if (user) fetchData()
  }, [user]);

  return <div>{data || "Home"}</div>;
}

export default HomePage;
