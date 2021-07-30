import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ServiseApi from "./service/ImageApi";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [pictures, setPictures] = useState([]);
  const [currentPictures, setCurrentPictures] = useState([]);
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchPictures = async () => {
      loaderToggle();
      const settings = {
        query,
        page,
        perPage,
      };
      return ServiseApi.getImages(settings)
        .then((hits) => setPictures((prevState) => [...prevState, ...hits]))
        .finally(() => loaderToggle());
    };

    fetchPictures();
  }, [page, query, perPage]);

  const onSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setPictures([]);
  };

  const OnLoadMore = () => {
    setPage((prevState) => prevState + 1);
    if (query) {
      loaderToggle();
      scrollPage();
      loaderToggle();
    }
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: "smooth",
      });
    }, 800);
  };

  const onImgClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setCurrentPictures(e.target.dataset.img);

    toggleModal();
  };

  const loaderToggle = () => {
    setLoader((prevState) => !prevState);
  };

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div className="App">
      {loader && (
        <Modal>
          <Loader type="Rings" color="#00BFFF" height={700} width={700} />
        </Modal>
      )}
      <Searchbar value={query} onFormSubmit={onSubmit} />
      <ImageGallery pictures={pictures} onImgClick={onImgClick} />
      {pictures.length > 0 && (
        <Button onBtnClick={OnLoadMore} text={loader ? "Загружаем" : "Загрузить еще"} />
      )}

      {openModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={currentPictures} alt="Dont Worry Be Happy" />
        </Modal>
      )}
    </div>
  );
}

export default App;
