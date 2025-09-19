import { useState, useEffect, useCallback } from 'react';
import { getImageById } from '../api/catApi';
import { CatImage } from '../api/types';
import { parseCatImages } from '../api/parsers';

interface UseFetchImageDetailResult {
  selectedImage: CatImage | null;
  isLoading: boolean;
  error: string | null;
  fetchImageDetail: (imageId: string, initialImage?: unknown) => Promise<void>;
}

const useFetchImageDetail = (): UseFetchImageDetailResult => {
  const [selectedImage, setSelectedImage] = useState<CatImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImageDetail = useCallback(async (imageId: string, initialImage?: unknown) => {
    setIsLoading(true);
    setError(null);
    try {
      let fetchedImage: CatImage | null = null;

      // Try to parse from initialImage (e.g., from location.state)
      if (initialImage) {
        try {
          const [image] = parseCatImages([initialImage]);
          fetchedImage = image;
        } catch (e) {
          console.warn('Invalid initial image data from state, fetching from API:', e);
        }
      }

      // If not found in initialImage or parsing failed, fetch from API
      if (!fetchedImage) {
        fetchedImage = await getImageById(imageId);
      }

      setSelectedImage(fetchedImage);
    } catch (err) {
      console.error('Failed to fetch image details:', err);
      setError('Failed to load image details.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { selectedImage, isLoading, error, fetchImageDetail };
};

export default useFetchImageDetail;
