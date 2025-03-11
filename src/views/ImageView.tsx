import { useState, useEffect, JSX } from 'react'
import { useNavigate, useParams, useLocation, Location } from 'react-router-dom'
import Modal from '../components/Modal'
import { CatImage } from '../api/types'
import { useFavorites } from '../hooks/useFavorites'
import { parseCatImages } from '../api/parsers'

function ImageView(): JSX.Element {
	const [selectedImage, setSelectedImage] = useState<CatImage | null>(null)
	const navigate = useNavigate()
	const location: Location<unknown> = useLocation()
	const { imageId } = useParams()
	const { addFavorite } = useFavorites()

	useEffect(() => {
		const imageUnParsed = (typeof location.state === 'object' 
			&& location.state 
			&& 'image' in location.state)
				? location.state.image 
				: undefined

		try {
			const [image] = parseCatImages([imageUnParsed])
			setSelectedImage(image)
		} catch (error) {
			console.error('Invalid image data:', error)
			void navigate('/')
		}
	}, [location.state, navigate])

	const closeModal = () => {
		void navigate('/')
	}

	const markAsFavourite = (img: CatImage) => {
		addFavorite(img)
	}

	if (!selectedImage) return <div>Loading...</div>

	return (
		<Modal onClose={closeModal}>
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
				onClick={() => { markAsFavourite(selectedImage) }}
			>
				Mark as Favourite
			</button>
		</Modal>
	)
}

export default ImageView
