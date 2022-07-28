import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, handleOnImage }) => {
  return images.map(({ webformatURL, id }) => (
    <li className={s.item} key={id} onClick={() => handleOnImage(id)}>
      <img src={webformatURL} alt="" className={s.itemImage} />
    </li>
  ));
};

ImageGalleryItem.ptopTypes = {
  handleOnImage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
