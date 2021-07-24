import React from "react";

const ImageGalleryItem = ({ src, largeImg }) => (
  <li className="ImageGalleryItem">
    <img
      src={src}
      alt=""
      className="ImageGalleryItem-image"
      data-img={largeImg}
      height="240"
      width="320"
    />
  </li>
);

export default ImageGalleryItem;
