import s from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ handleLoadMore }) => {
  return (
    <button type="button" className={s.button} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

Button.ptopTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
