import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

const ImageGallery = ({ pictures, onImgClick }) => (
  <ul className="ImageGallery" onClick={onImgClick}>
    {pictures.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem key={id} src={webformatURL} largeImg={largeImageURL} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object),
  onImgClick: PropTypes.func.isRequired,
};

export default ImageGallery;
