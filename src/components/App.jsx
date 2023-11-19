import React, { Component } from "react"; 
import { fetchBySearch } from "api";
import toast, { Toaster } from 'react-hot-toast';

import { Circles } from "react-loader-spinner";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";

export class App extends Component {
  state = { 
    images: [],
    query: "",
    page: 1,
    largeImageURL: "",
    isLoading: false,
    loadMore: false,
    isShowModal: false,
    error: false,
  } 

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  handleFormSubmit = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  handleImageClick = image => {
    this.setState({
      isShowModal: true,
      largeImageURL: image.largeImageURL,
    });
  };

  handleModalClose = () => {
    this.setState({
      isShowModal: false,
      largeImageURL: "",
    });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    const newQueryPart = query.split('/').pop();

    try {
      this.setState({
        isLoading: true,
        error: false,
      });
      const imageData = await fetchBySearch({ newQueryPart, page });

      if (imageData !== null) {

        this.setState(prevState => ({
          images: [...prevState.images, ...imageData.hits],
          loadMore: page < Math.ceil(imageData.totalHits /12),
        }));
      }

    } catch (error) {
      this.setState({ error: true });
      toast.error('Oops! Something went wrong! Please try reloading this page!');

    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() { 
    const { images, isLoading, loadMore, largeImageURL, isShowModal } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {isLoading && (
          <Circles
            height="320"
            width="320"
            color="#303f9f"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}

        <ImageGallery items={images} isLoading={isLoading} onImageClick={ this.handleImageClick} />

        {images.length > 0 && loadMore && (<Button onClick={this.handleLoadMore} />)}

        {isShowModal && (<Modal largeImageURL={largeImageURL} onClose={this.handleModalClose} />)}

        <Toaster />

      </>
    );
  }
}
 