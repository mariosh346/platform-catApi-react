import { useState, useCallback, useEffect } from 'react';
import { getBreeds } from '../api/catApi';
import { Breed } from '../api/types';
import { parseBreeds } from '../api/parsers';

const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState<Breed[]>(() => {
    const stored = localStorage.getItem('fetchedBreeds');
    return stored ? parseBreeds(JSON.parse(stored)) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBreeds = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const newBreeds = await getBreeds();
      setBreeds(newBreeds);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch breeds');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    localStorage.setItem('fetchedBreeds', JSON.stringify(breeds));
  }, [breeds]);

  return { breeds, fetchBreeds, isLoading, error };
};

export default useFetchBreeds;
