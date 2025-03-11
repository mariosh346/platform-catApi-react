import { JSX } from 'react'
import { useFavorites } from '../hooks/useFavorites'

function Favorites(): JSX.Element {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <div>
      <h1>Favourite Cats</h1>
      <div className="flex flex-wrap">
        {favorites.length ? (
          favorites.map(fav => (
            <div key={fav.id} className="m-3">
              <img src={fav.url} alt="cat" className="w-60 h-60 object-cover" />
              <button
                type="button"
                onClick={() => {removeFavorite(fav.id)}}
              >
                Remove Favourite
              </button>
            </div>
          ))
        ) : (
          <p>No favourites yet.</p>
        )}
      </div>
    </div>
  )
}

export default Favorites
