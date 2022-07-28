import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import s from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
  };
  handleSubmit = query => {
    this.setState({ query: query });
  };
  render() {
    const { query } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={query} />
      </div>
    );
  }
}
