import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import s from './ImageGallery.module.css';
import { service } from 'ServiceApi/service';
import { mapper } from 'Utilits/mapper';
import { Spinner } from 'components/Spinner/Spinner';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const STATUS = {
  Idle: 'idle',
  Loading: 'loading',
  Error: 'error',
  Success: 'success',
};

export class ImageGallery extends Component {
  state = {
    posts: null,
    page: 1,
    status: STATUS.Idle,
    image: '',
  };

  componentDidUpdate(prevProps) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.setState({ status: STATUS.Loading });
      service(1, query)
        .then(({ data }) =>
          this.setState({
            posts: { ...data, hits: [...mapper(data.hits)] },
            page: 2,
            status: STATUS.Success,
          })
        )
        .catch(function (error) {
          console.log(error.toJSON());
        });
    }
  }

  handleLoadMore = () => {
    const { page } = this.state;
    const { query } = this.props;
    this.setState({ status: STATUS.Loading });
    service(page, query)
      .then(({ data }) =>
        this.setState(prevState => ({
          posts: {
            ...prevState.posts,
            ...data,
            hits: [...prevState.posts.hits, ...mapper(data.hits)],
          },
          page: prevState.page + 1,
          status: STATUS.Success,
        }))
      )
      .catch(function (error) {
        console.log(error.toJSON());
      });
  };

  handleOnImage = img => {
    const { posts } = this.state;
    const image = posts.hits.find(({ id }) => img === id);
    this.setState({ image });
  };
  handleCloseModal = () => {
    this.setState({ image: '' });
  };

  render() {
    const { posts, status, image } = this.state;

    return (
      <>
        <ul className={s.gallery}>
          {posts && (
            <ImageGalleryItem
              images={posts.hits}
              handleOnImage={this.handleOnImage}
            />
          )}
        </ul>
        {status === STATUS.Loading && <Spinner />}
        {posts &&
          posts.totalHits > 12 &&
          posts.hits.length !== posts.totalHits && (
            <Button handleLoadMore={this.handleLoadMore} />
          )}
        {image && (
          <Modal largeImg={image.largeImageURL} close={this.handleCloseModal} />
        )}
        {posts && posts.hits.length === 0 && (
          <p style={{ textAlign: 'center' }}>
            Нічого на знайшли за вашим запитом :(
          </p>
        )}
      </>
    );
  }
}

ImageGallery.ptopTypes = {
  query: PropTypes.string,
};
