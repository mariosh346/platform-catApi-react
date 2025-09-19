import { useMemo, JSX, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breed } from '../api/types';
import useFetchBreeds from '../hooks/useFetchBreeds';
import Loader from '../components/atoms/Loader';

const BreedListItem = memo(({ breed }: { breed: Breed }): JSX.Element => {
  return (
    <li>
      <Link to={`/breed-detail/${breed.id}`} state={{ breed }} onMouseEnter={() => void import('./BreedDetail')}>
        {breed.name}
      </Link>
    </li>
  );
});

function Breeds(): JSX.Element {
  const { breeds, fetchBreeds, isLoading, error } = useFetchBreeds();

  useEffect(() => {
    if (isLoading || breeds.length > 0) return;
    void fetchBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listItems = useMemo(() => {
    return breeds.map((breed) => <BreedListItem key={breed.id} breed={breed} />);
  }, [breeds]);

  return (
    <div>
      <h1>Cat Breeds</h1>
      {isLoading && <Loader />}
      {error && <p className="text-red-500 text-center my-4">{error}</p>}
      {!isLoading && !error && breeds.length > 0 && <ul>{listItems}</ul>}
      {!isLoading && !error && breeds.length === 0 && <p className="text-center my-4">No breeds found.</p>}
    </div>
  );
}

export default Breeds
