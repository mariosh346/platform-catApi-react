import { JSX, memo } from 'react';
import { Link } from 'react-router-dom';
import { CatImage } from '../../api/types';

interface ImageCardProps {
    image: CatImage;
    renderAfterImage?: (image: CatImage) => JSX.Element;
}

const ImageCard = memo(({ image, renderAfterImage }: ImageCardProps): JSX.Element => {
    return (
        <div className="flex flex-wrap m-3">
            <Link
                to={`/image/${image.id}`}
                state={{ image }}
                onMouseEnter={() => void import('../../views/ImageView')}
            >
                <img
                    src={image.url}
                    alt="cat"
                    className='w-48 h-48 object-cover rounded-lg shadow-md'
                    loading="lazy" // Implement lazy-loading
                />
            </Link>
            {renderAfterImage?.(image)}
        </div>
    );
});

export default ImageCard;
