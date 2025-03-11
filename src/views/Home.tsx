import { JSX, useEffect } from 'react'
import useFetchedImages from '../hooks/useFetchedImages'
import ImageGallery from '../components/ImageGallery'

function Home(): JSX.Element {
  const { images, fetchImages, isLoading, error } = useFetchedImages()

  useEffect(() => {
    if (isLoading) return
    void fetchImages()
  }, [])

  return (
    <div>
      <h1>Random Cats</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && images.length && <div>
        <ImageGallery images={images} />
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
