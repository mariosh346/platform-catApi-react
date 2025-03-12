import { useEffect, useState, JSX, useCallback, useMemo } from 'react'
import { useLocation, useNavigate, useParams, Location } from 'react-router-dom'
import Modal from '../components/Modal'
import { getBreedById, getBreedImages } from '../api/catApi'
import ImageGallery from '../components/ImageGallery'
import { parseBreed } from '../api/parsers'
import { Breed, CatImage } from '../api/types'

function BreedDetail(): JSX.Element {
  const location: Location<unknown> = useLocation()
  const navigate = useNavigate()
  const { breedId } = useParams<{ breedId: string }>()
  const [breedImages, setBreedImages] = useState<CatImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
  const [breed, setBreed] = useState<Breed | null>(null);
  const navigateBreeds = useCallback(() => navigate('/breeds'), [navigate])

  const fetchBreedFromState = useCallback(() => {
    const breedUnParsed: unknown = (typeof location.state === 'object'
    && location.state && 'breed' in location.state)
      ? location.state.breed
      : undefined
    if (breedUnParsed) {
    try {
      setBreed(parseBreed(breedUnParsed))
    } catch {
      console.error('Invalid state data:')
    }}
  }, [location.state])

  const fetchBreedFromApi = useCallback(async (id: string) => {
    try {
      const breed = await getBreedById(id)
      setBreed(breed)
    } catch (err) {
      console.error('Failed to fetch image:', err)
      setError('Failed to load image')
    }
  }, [])


  useEffect(() => {
    if (!breedId) return
		setIsLoading(true)
    fetchBreedFromState()
    if (breedId) {
      void fetchBreedImages(breedId)
      void fetchBreedFromApi(breedId)
    }
    setIsLoading(false)
  }, [breedId, fetchBreedFromApi, fetchBreedFromState])

  const fetchBreedImages = async (breedId: string) => {
    try {
      const data = await getBreedImages(breedId, 10)
      setBreedImages(data)
    } catch (error) {
      console.error(error)
    }
  }

  const closeModal = () => {
    void navigateBreeds()
  }

  const errorMessage = useMemo(() => 
      (error ?? !breed) ? 'Error loading breed' : undefined,
      [error, breed]
    )

  return (
    <Modal onClose={closeModal} isLoading={isLoading} error={errorMessage}>
      {breed && <>
        <h1>{breed.name}</h1>
        <p>{breed.description}</p>
        <ImageGallery images={breedImages} />
      </>}
    </Modal>
  )
}

export default BreedDetail
