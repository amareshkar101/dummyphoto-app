import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Image.css";

function Image() {
  const [item, setItem] = useState([]);

  const getPhoto = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    const myphoto = await res.data;
    setItem(myphoto.products);
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <div className="container">
      <div className="photos">
        {item.map((pic) => {
          const { thumbnail, id, title } = pic;
          return (
            <div className="photo-box">
              <img src={thumbnail} key={id} className="photo" />
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Image;
