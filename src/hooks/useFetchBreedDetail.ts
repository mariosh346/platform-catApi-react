import { useState, useCallback } from 'react';
import { getBreedById, getBreedImages } from '../api/catApi';
import { Breed, CatImage } from '../api/types';
import { parseBreed } from '../api/parsers';

interface UseFetchBreedDetailResult {
  breed: Breed | null;
  breedImages: CatImage[];
  isLoading: boolean;
  error: string | null;
  fetchBreedDetail: (breedId: string, initialBreed?: unknown) => Promise<void>;
}

const useFetchBreedDetail = (): UseFetchBreedDetailResult => {
  const [breed, setBreed] = useState<Breed | null>(null);
  const [breedImages, setBreedImages] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBreedDetail = useCallback(async (breedId: string, initialBreed?: unknown) => {
    setIsLoading(true);
    setError(null);
    try {
      let fetchedBreed: Breed | null = null;

      if (initialBreed) {
        try {
          fetchedBreed = parseBreed(initialBreed);
        } catch (e) {
          console.warn('Invalid initial breed data from state, fetching from API:', e);
        }
      }

      if (!fetchedBreed) {
        fetchedBreed = await getBreedById(breedId);
      }

      setBreed(fetchedBreed);

      const images = await getBreedImages(breedId, 10);
      setBreedImages(images);
    } catch (err) {
      console.error('Failed to fetch breed details or images:', err);
      setError('Failed to load breed details or images.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { breed, breedImages, isLoading, error, fetchBreedDetail };
};

export default useFetchBreedDetail;
