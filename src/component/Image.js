import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Image.css";

const PER_PAGE = 8;

function Image() {
  const [currPage, setCurrPage] = useState(0);
  const [item, setItem] = useState([]);

  const getPhoto = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    const myphoto = await res.data;
    setItem(myphoto.products);
  };

  useEffect(() => {
    getPhoto();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrPage(selectedPage);
  }

  const offset = currPage * PER_PAGE;

  const currPageData = item.slice(offset, offset + PER_PAGE).map((pic) => {
    const { thumbnail, id, title } = pic;
    return (
      <div className="photo-box">
        <img src={thumbnail} key={id} className="photo" />
        <p>{title}</p>
      </div>
    );
  });

  const pageCount = Math.ceil(item.length / PER_PAGE);
  return (
    <div className="container">
      <div className="photos">
        {currPageData}

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination_link"}
          nextLinkClassName={"pagination_link"}
        />
      </div>
    </div>
  );
}

export default Image;
