import React, { JSX } from 'react';
import { CatImage } from '../api/types';
import ImageCard from './molecules/ImageCard';
import Skeleton from './atoms/Skeleton';

interface ImageGalleryProps {
  images: CatImage[];
  renderAfterImage?: (image: CatImage) => JSX.Element;
  isLoading?: boolean; // Added isLoading prop
}

const ImageGallery = React.memo(({ images, renderAfterImage, isLoading = false }: ImageGalleryProps): JSX.Element => {
  const numberOfSkeletons = 10; // Display 10 skeleton cards while loading

  return (
    <div className="flex flex-wrap justify-center" data-cy="image-gallery">
      {isLoading && images.length === 0
        ? Array.from({ length: numberOfSkeletons }).map((_, index) => <Skeleton key={index} width="200px" height="200px" className="m-3" />)
        : images.map((image) => (
          <ImageCard key={image.id} image={image} renderAfterImage={renderAfterImage} />
        ))}
    </div>
  );
});

export default ImageGallery
