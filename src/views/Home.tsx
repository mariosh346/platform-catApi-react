import { JSX, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CatImage } from '../api/types'
import useFetchedImages from '../hooks/useFetchedImages'

function Home(): JSX.Element {
  const { images, fetchImages, isLoading, error } = useFetchedImages()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    void fetchImages()
  }, [])

  const openModal = (img: CatImage) => {
    return navigate(`/image/${img.id}`)
  }

  return (
    <div>
      <h1>Random Cats</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && images.length && <div>
        <div className="flex flex-wrap">
          {images.map(img => (
            <img
              key={img.id}
              src={img.url}
              alt="cat"
              className="w-48 h-48 m-3 cursor-pointer"
              onClick={() => { void openModal(img) }}
            />
          ))}
        </div>
        <button 
          type="button" 
          onClick={() => { void fetchImages() }}
          disabled={isLoading}
        >
          Load New
        </button>
      </div>}
    </div>
  )
}

export default Home
