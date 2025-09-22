import { JSX, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CatImage } from '../../api/types';
import Skeleton from '../atoms/Skeleton';

interface ImageCardProps {
    image: CatImage;
    renderAfterImage?: (image: CatImage) => JSX.Element;
}

const ImageCard = memo(({ image, renderAfterImage }: ImageCardProps): JSX.Element => {
    const [isLoadingImage, setIsLoadingImage] = useState(true);

    return (
        <div className="flex flex-wrap flex-col m-3 relative">
            <Link
                to={`/image/${image.id}`}
                state={{ image }}
                onMouseEnter={() => void import('../../views/ImageView')}
            >
                {isLoadingImage && <Skeleton width="192px" height="192px" className="rounded-lg shadow-md" data-cy="image-card-skeleton" />}
                <img
                    src={image.url}
                    alt="cat"
                    className={`w-48 h-48 object-cover rounded-lg shadow-md ${isLoadingImage ? 'hidden' : 'block'}`}
                    // loading="lazy" // Implement lazy-loading
                    onLoad={() => setIsLoadingImage(false)}
                />
            </Link>
            {renderAfterImage?.(image)}
        </div>
    );
});

export default ImageCard;
