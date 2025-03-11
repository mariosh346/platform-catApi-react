import { JSX, memo } from 'react'
import { CatImage } from '../api/types'
import { Link } from 'react-router-dom'

interface ImageGalleryProps {
  images: CatImage[]
}

const MemoizedImageItem = memo(({ image }: { image: CatImage }) => (
  <Link 
    to={`/image/${image.id}`} 
    state={{ image }} 
    className='m-3'
  >
    <img 
      src={image.url} 
      alt="cat"
      className='w-48 h-48'
    />
  </Link>
))

const ImageGallery = ({ images }: ImageGalleryProps): JSX.Element => {
  return (
    <div className="flex flex-wrap">
      {images.map(image => (
        <MemoizedImageItem key={image.id} image={image} />
      ))}
    </div>
  )
}

export default ImageGallery
