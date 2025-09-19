import { useEffect, JSX, useMemo, useCallback } from 'react';
import { useNavigate, useParams, useLocation, Location } from 'react-router-dom';
import Modal from '../components/Modal';
import { CatImage } from '../api/types';
import { useFavorites } from '../hooks/useFavorites';
import useFetchImageDetail from '../hooks/useFetchImageDetail';
import Button from '../components/atoms/Button';
import Loader from '../components/atoms/Loader';

function ImageView(): JSX.Element {
	const navigate = useNavigate();
	const location: Location<unknown> = useLocation();
	const { imageId } = useParams<{ imageId: string }>();
	const { addFavorite, removeFavorite, favorites } = useFavorites();
	const { selectedImage, isLoading, error, fetchImageDetail } = useFetchImageDetail();

	const navigateHome = useCallback(() => navigate('/'), [navigate]);

	useEffect(() => {
		if (!imageId) {
			navigateHome();
			return;
		}
		const initialImage =
			typeof location.state === 'object' && location.state && 'image' in location.state
				? location.state.image
				: undefined;
		void fetchImageDetail(imageId, initialImage);
	}, [imageId, fetchImageDetail, location.state, navigateHome]);

	const closeModal = () => {
		void navigate(-1);
	};

	const isFavorite = useMemo(
		() => (selectedImage ? favorites.some((fav) => fav.id === selectedImage.id) : false),
		[selectedImage, favorites],
	);

	const errorMessage = useMemo(() => (error ?? !selectedImage) ? 'Error loading image' : undefined, [
		error,
		selectedImage,
	]);

	const clickFavoriteButton = (image: CatImage) => {
		if (isFavorite) {
			removeFavorite(image);
		} else {
			addFavorite(image);
		}
	};

	return (
		<Modal onClose={closeModal} isLoading={isLoading} error={errorMessage} title={selectedImage?.breeds?.[0]?.name || 'Cat Image'}>
			{isLoading && !selectedImage && <Loader message="Loading image details..." />}
			{error && !selectedImage && <p className="text-red-500 text-center my-4">{error}</p>}
			{selectedImage && (
				<div className="flex flex-col items-center">
					<img src={selectedImage.url} alt="cat" className="max-w-full h-auto rounded-lg shadow-md mb-4" loading="lazy" />
					{selectedImage.breeds && selectedImage.breeds.length > 0 ? (
						<>
							<h3 className="text-xl font-semibold">{selectedImage.breeds[0].name}</h3>
							<p className="text-gray-700 text-center mt-2">{selectedImage.breeds[0].description}</p>
						</>
					) : (
						<p className="text-gray-700 mt-2">No breed info available</p>
					)}
					<Button
						onClick={() => {
							clickFavoriteButton(selectedImage);
						}}
						variant={isFavorite ? 'danger' : 'primary'}
						className="mt-4"
					>
						{isFavorite ? 'Remove from Favourites' : 'Mark as Favourite'}
					</Button>
				</div>
			)}
		</Modal>
	);
}

export default ImageView
