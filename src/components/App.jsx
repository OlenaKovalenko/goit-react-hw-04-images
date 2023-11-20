import React, { useEffect, useState } from "react"; 
import { fetchBySearch } from "api";
import toast, { Toaster } from 'react-hot-toast';

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Searchbar } from "./Searchbar/Searchbar";
import { ModalWindow } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

export const App = () => {

  const[images, setImages] = useState([]);
  const[query, setQuery] = useState("");
  const[page, setPage] = useState(1);
  const[largeImageURL, setLargeImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const[loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    async function fetchImages () {
    const newQueryPart = query.split('/').pop();

    try {
      setIsLoading(true);
    
      const imageData = await fetchBySearch({ newQueryPart, page });
      const { hits, totalHits } = imageData;

      if (imageData !== null) {
        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      }

    } catch (error) {
      toast.error('Oops! Something went wrong! Please try reloading this page!');

    } finally {
      setIsLoading(false);
    }
  };
    fetchImages()
}, [query, page]);
  

  const handleFormSubmit = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setPage(1);
    setImages([]);
    };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    };

  const openModal = image => {
    setIsShowModal(true);
    setLargeImageURL(image.largeImageURL);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setLargeImageURL("");
  };

    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />

        {isLoading && <Loader/>}

        <ImageGallery items={images} isLoading={isLoading} onImageClick={openModal} />

        {images.length > 0 && loadMore && (<Button onClick={handleLoadMore} />)}

        {isShowModal && (<ModalWindow modalIsOpen={isShowModal} src={largeImageURL} closeModal={closeModal} />)}

        <Toaster />

      </>
    );
  
}
 