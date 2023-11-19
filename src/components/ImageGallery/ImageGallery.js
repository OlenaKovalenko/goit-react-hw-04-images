import '../../styles.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";


export const ImageGallery = ({ items, onImageClick }) => {
    return (
        <ul className='ImageGallery'>
            {items.map(item => (
                <ImageGalleryItem key={item.id} item={item} onImageClick={onImageClick}/>
            ))}
        </ul>
    )
};