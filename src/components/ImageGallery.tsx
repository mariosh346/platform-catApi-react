import { JSX, memo } from 'react'
import { CatImage } from '../api/types'
import { Link } from 'react-router-dom'

interface ImageGalleryProps {
  images: CatImage[],
  renderAfterImage?: (image: CatImage) => JSX.Element
}

const MemoizedImageItem = memo(({ image, renderAfterImage }: { image: CatImage, renderAfterImage: ImageGalleryProps['renderAfterImage'] }) => (
  <div className="flex flex-wrap m-3">
    <Link 
        to={`/image/${image.id}`} 
        state={{ image }} 
    >
        <img 
        src={image.url} 
        alt="cat"
        className='w-48 h-48'
        />
    </Link>
    {renderAfterImage?.(image)}
  </div>
))

const ImageGallery = ({ images, renderAfterImage }: ImageGalleryProps): JSX.Element => {
  return (
    <div className="flex flex-wrap justify-center">
      {images.map(image => (
        <MemoizedImageItem key={image.id} image={image} renderAfterImage={renderAfterImage} />
      ))}
    </div>
  )
}

export default ImageGallery
