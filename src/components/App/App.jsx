import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Container } from './App.styled';

class App extends React.Component {
  state = {
    searchQuery: '',
  };

  onSubmit = ({ searchQuery }) => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />

        <ToastContainer autoClose={3000} theme={'colored'} />
      </Container>
    );
  }
}

export default App;
