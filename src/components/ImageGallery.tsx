import { JSX } from 'react'
import { CatImage } from '../api/types'
import { Link } from 'react-router-dom'

interface ImageGalleryProps {
  images: CatImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps): JSX.Element => {
  return (
    <div className="flex flex-wrap">
      {images.map(img => (
        <Link 
          to={`/image/${img.id}`} 
          key={img.id} 
          state={{ image: img }} 
          className='m-3'
        >
          <img 
              src={img.url} 
              alt="cat"
              className='w-48 h-48'
          />
        </Link>
      ))}
    </div>
  )
}

export default ImageGallery
