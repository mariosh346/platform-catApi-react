import { JSX } from 'react';
import { CatImage } from '../api/types';
import ImageCard from './molecules/ImageCard';
import SkeletonCard from './atoms/SkeletonCard';

interface ImageGalleryProps {
  images: CatImage[];
  renderAfterImage?: (image: CatImage) => JSX.Element;
  isLoading?: boolean; // Added isLoading prop
}

const ImageGallery = ({ images, renderAfterImage, isLoading = false }: ImageGalleryProps): JSX.Element => {
  const numberOfSkeletons = 10; // Display 10 skeleton cards while loading

  return (
    <div className="flex flex-wrap justify-center" data-cy="image-gallery">
      {isLoading && images.length === 0
        ? Array.from({ length: numberOfSkeletons }).map((_, index) => <SkeletonCard key={index} />)
        : images.map((image) => (
          <ImageCard key={image.id} image={image} renderAfterImage={renderAfterImage} />
        ))}
    </div>
  );
};

export default ImageGallery
