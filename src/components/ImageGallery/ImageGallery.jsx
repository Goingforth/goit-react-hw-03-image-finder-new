import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalLery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { LoaderStyle } from 'components/Loader/Loader.styled';
import Button from 'components/Button/Button';
import fetchImages from 'components/services/images-api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    loading: false,
    page: 1,
    loadMore: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.searchQuery;
    const searchQuery = this.props.searchQuery;
    const page = this.state.page;
    const prevPage = prevState.page;
    if (prevRequest !== searchQuery || prevPage !== page) {
      if (prevRequest !== this.props.searchQuery) {
        this.setState({ page: 1, images: null });
      }
      //   if (prevProps.searchQuery !== this.props.searchQuery) {
      //     this.setState( function (prevState, props) {
      //       return { page: 1, images: null };
      //     });
      //   }
      this.setState({ loading: true });

      fetchImages({ searchQuery, page })
        .then(images => images.hits)
        .then(images => {
          if (images.length === 0) {
            return Promise.reject(new Error());
          }
          return images;
        })
        .then(images => {
          if (images.length < 12) {
            this.setState({
              loadMore: null,
            });
            toast.info('Pictures are over');
          } else {
            this.setState({
              loadMore: true,
            });
          }
          if (this.state.images) {
            this.setState({
              images: [...this.state.images, ...images],
            });
          } else {
            this.setState({
              images: images,
            });
          }
        })

        .catch(() => {
          toast.info('There are no images for this search');
        })
        .finally(() => {
          this.setState({ loading: null });
        });
    }
  }

  onClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { error, loading, images, loadMore } = this.state;

    return (
      <div>
        {error && <h2>{error.message}</h2>}
        {loading && (
          <LoaderStyle>
            <Loader />
          </LoaderStyle>
        )}
        {images && (
          <>
            <GalLery>
              {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tags={tags}
                  largeImageURL={largeImageURL}
                />
              ))}
            </GalLery>
            {loadMore && <Button onClick={this.onClick} />}
          </>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
};
