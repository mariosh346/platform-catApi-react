import { JSX, useCallback } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import ImageGallery from '../components/ImageGallery';
import { CatImage } from '../api/types';
import Button from '../components/atoms/Button';

function Favorites(): JSX.Element {
  const { favorites, removeFavorite } = useFavorites();

  const renderRemoveFavoriteButton = useCallback((fav: CatImage): JSX.Element => {
    return (
      <Button
        type="button"
        onClick={() => {
          removeFavorite(fav);
        }}
        variant="danger"
        size="small"
        className="mt-2"
      >
        Remove
      </Button>
    );
  }, [removeFavorite]);

  return (
    <div>
      <h1>Favourite Cats</h1>
      {favorites.length > 0 ? (
        <ImageGallery images={favorites} renderAfterImage={renderRemoveFavoriteButton} />
      ) : (
        <p className="text-center my-4">No favorite cats yet.</p>
      )}
    </div>
  );
}

export default Favorites
