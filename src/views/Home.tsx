import { JSX, useEffect } from 'react'
import useFetchedImages from '../hooks/useFetchedImages'
import ImageGallery from '../components/ImageGallery'

function Home(): JSX.Element {
  const { images, fetchImages, isLoading, error } = useFetchedImages()

  useEffect(() => {
    if (isLoading) return
    void fetchImages()
  // we only want to fetch new images when the component mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Random Cats</h1>
      {images.length && <div>
        <ImageGallery images={images} />
        <button 
          type="button" 
          onClick={() => { void fetchImages(false) }}
          disabled={isLoading}
        >
          Load More
        </button>
      </div>}
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Home
