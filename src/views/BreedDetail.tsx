import React, { useEffect, JSX, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams, Location } from 'react-router-dom';
import Modal from '../components/Modal';
import ImageGallery from '../components/ImageGallery';
import useFetchBreedDetail from '../hooks/useFetchBreedDetail';
import Skeleton from '../components/atoms/Skeleton';
import ErrorMessage from '../components/atoms/ErrorMessage';

function BreedDetail(): JSX.Element {
  const location: Location<unknown> = useLocation();
  const navigate = useNavigate();
  const { breedId } = useParams<{ breedId: string }>();
  const { breed, breedImages, isLoading, error, fetchBreedDetail } = useFetchBreedDetail();

  const navigateBreeds = useCallback(() => navigate('/breeds'), [navigate]);

  useEffect(() => {
    if (!breedId) {
      navigateBreeds();
      return;
    }
    const initialBreed =
      typeof location.state === 'object' && location.state && 'breed' in location.state
        ? location.state.breed
        : undefined;
    void fetchBreedDetail(breedId, initialBreed);
  }, [breedId, fetchBreedDetail, location.state, navigateBreeds]);

  const closeModal = () => {
    void navigateBreeds();
  };

  const errorMessage = useMemo(() => (error ?? !breed) ? 'Failed to load breed details.' : undefined, [error, breed]);

  return (
    <Modal onClose={closeModal}>
      {isLoading && !breed && (
        <div className="p-4">
          <Skeleton height="30px" width="70%" className="mb-4" />
          <Skeleton height="20px" width="90%" className="mb-2" />
          <Skeleton height="20px" width="80%" className="mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width="100%" height="150px" className="rounded-lg" />
            ))}
          </div>
        </div>
      )}
      {error && !breed && <ErrorMessage message={errorMessage || 'An unknown error occurred.'} onRetry={() => void fetchBreedDetail(breedId!)} />}
      {breed && (
        <>
          <h1>{breed.name}</h1>
          <p>{breed.description}</p>
          <ImageGallery images={breedImages} />
        </>
      )}
      {!isLoading && !error && !breed && <p className="text-center my-4">No breed details found.</p>}
    </Modal>
  );
}

export default BreedDetail
