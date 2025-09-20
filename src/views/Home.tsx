import React, { JSX, useEffect } from 'react';
import useFetchCatImages from '../hooks/useFetchCatImages';
import ImageGallery from '../components/ImageGallery';
import Button from '../components/atoms/Button';
import ErrorMessage from '../components/atoms/ErrorMessage';

function Home(): JSX.Element {
  const { images, fetchImages, isLoading, error } = useFetchCatImages();

  useEffect(() => {
    if (isLoading || images.length > 0) return;
    void fetchImages();
    // we only want to fetch new images when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Random Cats</h1>
      {error && <ErrorMessage message="Failed to load images." onRetry={() => void fetchImages()} />}
      {!isLoading && !error && images.length === 0 && (
        <p className="text-center my-4">No images found.</p>
      )}
      <ImageGallery images={images} isLoading={isLoading} />
      <div className="flex justify-center my-4">
        <Button
          onClick={() => {
            void fetchImages(false);
          }}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

export default Home
