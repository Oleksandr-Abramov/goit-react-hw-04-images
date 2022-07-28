import { Audio } from 'react-loader-spinner';
import s from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={s.spinner}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};
