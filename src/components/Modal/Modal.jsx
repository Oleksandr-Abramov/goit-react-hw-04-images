import s from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ close, largeImg }) => {
  useEffect(() => {
    const handleCloseByEsc = evt => {
      if (evt.code === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleCloseByEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseByEsc);
    };
  }, [close]);

  const handleCloseByDrope = evt => {
    if (evt.target === evt.currentTarget) {
      close();
    }
  };

  return (
    <div className={s.overlay} onClick={handleCloseByDrope}>
      <div className={s.modal}>
        <img src={largeImg} alt={'Picrute'} width="860" />
      </div>
    </div>
  );
};

Modal.ptopTypes = {
  close: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleCloseByEsc);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleCloseByEsc);
//   }
//   handleCloseByEsc = evt => {
//     if (evt.code === 'Escape') {
//       this.props.close();
//     }
//   };

//   handleCloseByDrope = evt => {
//     if (evt.target === evt.currentTarget) {
//       this.props.close();
//     }
//   };
//   render() {
//     const { largeImg } = this.props;
//     return (
//       <div className={s.overlay} onClick={this.handleCloseByDrope}>
//         <div className={s.modal}>
//           <img src={largeImg} alt={'Picrute'} width="860" />
//         </div>
//       </div>
//     );
//   }
// }
