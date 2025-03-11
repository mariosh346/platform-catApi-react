import { JSX } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import ImageGallery from '../components/ImageGallery';
import { CatImage } from '../api/types';

function Favorites(): JSX.Element {
  const { favorites, removeFavorite } = useFavorites()
  const removeFavoriteButton = (fav: CatImage) => {
    return <button
      type="button"
      onClick={() => {removeFavorite(fav)}}
    >
      Remove
    </button>
  }



  return (
    <div>
      <h1>Favourite Cats</h1>
      <ImageGallery images={favorites} renderAfterImage={removeFavoriteButton}  />
    </div>
  )
}

export default Favorites
