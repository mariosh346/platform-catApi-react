import { JSX, memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CatImage } from '../../api/types';
import Skeleton from '../atoms/Skeleton';

interface ImageCardProps {
    image: CatImage;
    renderAfterImage?: (image: CatImage) => JSX.Element;
}

const ImageCard = memo(({ image, renderAfterImage }: ImageCardProps): JSX.Element => {
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const openImageModal = () => {
        navigate(`/image/${image.id}`, { state: { backgroundLocation: location } });
    };

    return (
        <div className="flex flex-wrap m-3 relative">
            <div
                onClick={openImageModal}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        openImageModal();
                    }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for cat image ${image.id}`}
                className="cursor-pointer"
            >
                {isLoadingImage && <Skeleton width="192px" height="192px" className="rounded-lg shadow-md" />}
                <img
                    src={image.url}
                    alt={`Cat ${image.id}`}
                    className={`w-48 h-48 object-cover rounded-lg shadow-md ${isLoadingImage ? 'hidden' : 'block'}`}
                    // loading="lazy" // Implement lazy-loading
                    onLoad={() => setIsLoadingImage(false)}
                />
            </div>
            {renderAfterImage?.(image)}
        </div>
    );
});

export default ImageCard;
