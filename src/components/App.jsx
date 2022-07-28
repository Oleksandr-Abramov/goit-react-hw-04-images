import { Searchbar } from './Searchbar/Searchbar';
import s from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = query => {
    setQuery(query);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery query={query} />
    </div>
  );
};
