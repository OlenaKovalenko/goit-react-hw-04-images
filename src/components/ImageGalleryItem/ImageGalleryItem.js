import '../../styles.css';

export const ImageGalleryItem = ({ onImageClick, item }) => {
    const { webformatURL, tags } = item;

    return (
        <li className="ImageGalleryItem" onClick={() => onImageClick(item)}>
            <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
        </li>
    )
}