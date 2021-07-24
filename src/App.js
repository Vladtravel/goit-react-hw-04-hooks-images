import Searchbar from "./components/Searchbar/Searchbar";
import React, { Component } from "react";
import ImageGallery from "./components/ImageGallery";
import ServiseApi from "./service/ImageApi";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends Component {
  state = {
    query: "",
    page: 1,
    perPage: 12,
    pictures: [],
    currentPictures: "",
    loader: false,
    openModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page, pictures } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchPictures().then(() => {
        this.loaderToggle();
        if (pictures.length > 10) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      });
    }
  }

  OnLoadMore = () => {
    this.setState((prev) => ({
      page: prev.page + 1,
    }));
  };

  onImgClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    this.setState({
      currentPictures: e.target.dataset.img,
    });
    this.toggleModal();
  };

  loaderToggle = () => {
    this.setState((prev) => ({
      loader: !prev.loader,
    }));
  };

  onImgOverviewClose = (e) => {
    if (e.target.className.contains("Overlay")) {
      this.toggleModal();
    }
  };

  fetchPictures = () => {
    const { query, page, perPage } = this.state;

    this.loaderToggle();
    const settings = {
      query: query,
      page: page,
      perPage: perPage,
    };
    return ServiseApi.getImages(settings).then((hits) => {
      this.setState((prev) => ({
        pictures: [...prev.pictures, ...hits],
      }));
    });
  };

  onSubmit = (searchQuery) => {
    this.setState({
      query: searchQuery,
      page: 1,
      pictures: [],
    });
  };
  toggleModal = () => {
    this.setState((prev) => ({
      openModal: !prev.openModal,
    }));
  };
  render() {
    const { pictures, query, loader, openModal, currentPictures } = this.state;
    return (
      <div className="App">
        {loader && (
          <Modal>
            <Loader type="Rings" color="#00BFFF" height={700} width={700} />
          </Modal>
        )}
        <Searchbar value={query} onFormSubmit={this.onSubmit} />
        <ImageGallery pictures={pictures} onImgClick={this.onImgClick} />
        {pictures.length > 0 && (
          <Button onBtnClick={this.OnLoadMore} text={loader ? "Загружаем" : "Загрузить еще"} />
        )}

        {openModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={currentPictures} alt="Dont Worry Be Happy" />
          </Modal>
        )}
      </div>
    );
  }
}
