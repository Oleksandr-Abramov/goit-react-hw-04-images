import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { service } from 'ServiceApi/service';
import { mapper } from 'Utilits/mapper';
import { Spinner } from 'components/Spinner/Spinner';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const STATUS = {
  Idle: 'idle',
  Loading: 'loading',
  Error: 'error',
  Success: 'success',
};

export const ImageGallery = ({ query }) => {
  const isFirstRender = useRef(true);
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.Idle);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!isFirstRender.current && query) {
      setStatus(STATUS.Loading);
      service(1, query)
        .then(
          ({ data }) => setPosts({ ...data, hits: [...mapper(data.hits)] }),
          setPage(2),
          setStatus(STATUS.Success)
        )
        .catch(function (error) {
          console.log(error.toJSON());
        });
    } else {
      isFirstRender.current = false;
    }
  }, [query]);

  const handleLoadMore = () => {
    setStatus(STATUS.Loading);
    service(page, query)
      .then(({ data }) => {
        setPosts(ps => ({
          ...ps.posts,
          ...data,
          hits: [...ps.hits, ...mapper(data.hits)],
        }));
        setPage(ps => ps + 1);
        setStatus(STATUS.Success);
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  };

  const handleOnImage = img => {
    const image = posts.hits.find(({ id }) => img === id);
    setImage(image);
  };

  const handleCloseModal = () => {
    setImage('');
  };

  return (
    <>
      <ul className={s.gallery}>
        {posts && (
          <ImageGalleryItem images={posts.hits} handleOnImage={handleOnImage} />
        )}
      </ul>
      {status === STATUS.Loading && <Spinner />}
      {posts &&
        posts.totalHits > 12 &&
        posts.hits.length !== posts.totalHits && (
          <Button handleLoadMore={handleLoadMore} />
        )}
      {image && (
        <Modal largeImg={image.largeImageURL} close={handleCloseModal} />
      )}
      {posts && posts.hits.length === 0 && (
        <p style={{ textAlign: 'center' }}>
          Нічого на знайшли за вашим запитом :(
        </p>
      )}
    </>
  );
};

ImageGallery.ptopTypes = {
  query: PropTypes.string,
};

// export class ImageGallery extends Component {
//   state = {
//     posts: null,
//     page: 1,
//     status: STATUS.Idle,
//     image: '',
//   };

//   componentDidUpdate(prevProps) {
//     const { query } = this.props;

//     if (prevProps.query !== query) {
//       this.setState({ status: STATUS.Loading });
//       service(1, query)
//         .then(({ data }) =>
//           this.setState({
//             posts: { ...data, hits: [...mapper(data.hits)] },
//             page: 2,
//             status: STATUS.Success,
//           })
//         )
//         .catch(function (error) {
//           console.log(error.toJSON());
//         });
//     }
//   }

//   handleLoadMore = () => {
//     const { page } = this.state;
//     const { query } = this.props;
//     this.setState({ status: STATUS.Loading });
//     service(page, query)
//       .then(({ data }) =>
//         this.setState(prevState => ({
//           posts: {
//             ...prevState.posts,
//             ...data,
//             hits: [...prevState.posts.hits, ...mapper(data.hits)],
//           },
//           page: prevState.page + 1,
//           status: STATUS.Success,
//         }))
//       )
//       .catch(function (error) {
//         console.log(error.toJSON());
//       });
//   };

//   handleOnImage = img => {
//     const { posts } = this.state;
//     const image = posts.hits.find(({ id }) => img === id);
//     this.setState({ image });
//   };
//   handleCloseModal = () => {
//     this.setState({ image: '' });
//   };

//   render() {
//     const { posts, status, image } = this.state;

//     return (
//       <>
//         <ul className={s.gallery}>
//           {posts && (
//             <ImageGalleryItem
//               images={posts.hits}
//               handleOnImage={this.handleOnImage}
//             />
//           )}
//         </ul>
//         {status === STATUS.Loading && <Spinner />}
//         {posts &&
//           posts.totalHits > 12 &&
//           posts.hits.length !== posts.totalHits && (
//             <Button handleLoadMore={this.handleLoadMore} />
//           )}
//         {image && (
//           <Modal largeImg={image.largeImageURL} close={this.handleCloseModal} />
//         )}
//         {posts && posts.hits.length === 0 && (
//           <p style={{ textAlign: 'center' }}>
//             Нічого на знайшли за вашим запитом :(
//           </p>
//         )}
//       </>
//     );
//   }
// }
