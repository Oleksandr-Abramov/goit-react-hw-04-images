export const mapper = img => {
  return img.map(({ id, webformatURL, largeImageURL }) => ({
    webformatURL,
    largeImageURL,
    id,
  }));
};
