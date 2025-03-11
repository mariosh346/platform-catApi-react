import { useState, useEffect, JSX, useMemo } from 'react'
import { useNavigate, useParams, useLocation, Location } from 'react-router-dom'
import Modal from '../components/Modal'
import { CatImage } from '../api/types'
import { useFavorites } from '../hooks/useFavorites'
import { parseCatImages } from '../api/parsers'
import { getImageById } from '../api/catApi'

function ImageView(): JSX.Element {
	const [selectedImage, setSelectedImage] = useState<CatImage | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const location: Location<unknown> = useLocation()
	const { imageId } = useParams()
	const { addFavorite, removeFavorite, favorites } = useFavorites()

	const fetchImageFromState = () => {
		const imageFromState = typeof location.state === 'object' 
			&& location.state 
			&& 'image' in location.state
			? location.state.image 
			: undefined

		if (imageFromState) {
			try {
				const [image] = parseCatImages([imageFromState])
				setSelectedImage(image)
				return
			} catch (error) {
				console.error('Invalid state data:', error)
			}
		}
	}
	
	const fetchImageFromApi = async (imageId: string) => {
		try {
			const image = await getImageById(imageId)
			setSelectedImage(image)
		} catch (err) {
			console.error('Failed to fetch image:', err)
			setError('Failed to load image')
			void navigate('/')
		}
	}
	const fetchImage = async () => {
		if (!imageId) return
		setIsLoading(true)
		fetchImageFromState()
		if (!selectedImage)  {
			await fetchImageFromApi(imageId)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		void fetchImage()
	}, [imageId])

	const closeModal = () => {
		void navigate(-1)
	}

	const isFavorite = useMemo(() => 
		selectedImage ? favorites.some(fav => fav.id === selectedImage.id) : false,
		[selectedImage, favorites]
	)

	const errorMessage = useMemo(() => 
		(error ?? !selectedImage) ? 'Error loading image' : undefined,
		[error, selectedImage]
	)
	const clickFavoriteButton = (selectedImage: CatImage) => {
		if (isFavorite) {
			removeFavorite(selectedImage) }
		else{
			addFavorite(selectedImage)
		}
	}


	return (
		<Modal onClose={closeModal} isLoading={isLoading} error={errorMessage}>
			{selectedImage && <>
			<img src={selectedImage.url} alt="cat" className="w-full" />
			{selectedImage.breeds && selectedImage.breeds.length > 0 ? (
				<>
					<h3>{selectedImage.breeds[0].name}</h3>
					<p>{selectedImage.breeds[0].description}</p>
				</>
			) : (
				<p>No breed info available</p>
			)}
			<button 
				type="button" 
				onClick={() => {
					clickFavoriteButton(selectedImage)
				}}
			>
				{isFavorite ? "Remove from Favourites" : "Mark as Favourite"}
			</button>
			</>}	
		</Modal>
	)
}

export default ImageView
