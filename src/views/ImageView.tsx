import React, { useEffect, JSX, useMemo, useCallback } from 'react';
import { useNavigate, useParams, useLocation, Location } from 'react-router-dom';
import Modal from '../components/Modal';
import { CatImage } from '../api/types';
import { useFavorites } from '../hooks/useFavorites';
import useFetchImageDetail from '../hooks/useFetchImageDetail';
import Button from '../components/atoms/Button';
import Skeleton from '../components/atoms/Skeleton';
import ErrorMessage from '../components/atoms/ErrorMessage';

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

	const errorMessage = useMemo(() => (error ?? !selectedImage) ? 'Failed to load image details.' : undefined, [
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
		<Modal onClose={closeModal} title={selectedImage?.breeds?.[0]?.name || 'Cat Image'}>
			{isLoading && !selectedImage && (
				<div className="p-4 flex flex-col items-center">
					<Skeleton width="100%" height="300px" className="rounded-lg mb-4" />
					<Skeleton height="25px" width="60%" className="mb-2" />
					<Skeleton height="20px" width="80%" className="mb-4" />
					<Skeleton height="40px" width="150px" className="rounded-md" />
				</div>
			)}
			{error && !selectedImage && <ErrorMessage message={errorMessage || 'An unknown error occurred.'} onRetry={() => void fetchImageDetail(imageId!)} />}
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
			{!isLoading && !error && !selectedImage && <p className="text-center my-4">No image details found.</p>}
		</Modal>
	);
}

export default ImageView
