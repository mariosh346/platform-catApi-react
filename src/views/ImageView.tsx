import { useState, useEffect, JSX } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import { CatImage } from '../api/types'
import { useFavorites } from '../hooks/useFavorites'
import useFetchedImages from '../hooks/useFetchedImages'

function ImageView(): JSX.Element {
	const [selectedImage, setSelectedImage] = useState<CatImage | null>(null)
	const { images } = useFetchedImages()
	const navigate = useNavigate()
	const { imageId } = useParams()  // use route parameter
	const { addFavorite } = useFavorites()

	useEffect(() => {
		if (imageId && images.length > 0) {
			const img = images.find(i => i.id === imageId)
			if (img) {
				setSelectedImage(img)
			}
		}
	}, [imageId, images])

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
			<button type="button" onClick={() => { markAsFavourite(selectedImage) }}>
				Mark as Favourite
			</button>
		</Modal>
	)
}

export default ImageView
