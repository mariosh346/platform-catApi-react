import { useEffect, JSX, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams, Location } from 'react-router-dom';
import Modal from '../components/Modal';
import ImageGallery from '../components/ImageGallery';
import useFetchBreedDetail from '../hooks/useFetchBreedDetail';
import Loader from '../components/atoms/Loader';

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

  const errorMessage = useMemo(() => (error ?? !breed) ? 'Error loading breed' : undefined, [error, breed]);

  return (
    <Modal onClose={closeModal} isLoading={isLoading} error={errorMessage}>
      {isLoading && !breed && <Loader message="Loading breed details..." />}
      {error && !breed && <p className="text-red-500 text-center my-4">{error}</p>}
      {breed && (
        <>
          <h1>{breed.name}</h1>
          <p>{breed.description}</p>
          <ImageGallery images={breedImages} />
        </>
      )}
    </Modal>
  );
}

export default BreedDetail
