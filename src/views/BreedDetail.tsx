import { useEffect, useState, JSX } from 'react'
import { useLocation, useNavigate, useParams, Location } from 'react-router-dom'
import Modal from '../components/Modal'
import { getBreedImages } from '../api/catApi'
import ImageGallery from '../components/ImageGallery'
import { parseBreed } from '../api/parsers'

interface Breed {
  id: string
  name: string
  description: string
}

interface CatImage {
  id: string
  url: string
}

function BreedDetail(): JSX.Element {
  const location: Location<unknown> = useLocation()
  const navigate = useNavigate()
  const { breedId } = useParams<{ breedId: string }>()
  const [breedImages, setBreedImages] = useState<CatImage[]>([])
  const breedUnParsed: unknown = typeof location.state === 'object'&& location.state && 'breed' in location.state
   ? location.state.breed : undefined

  let breed: Breed | undefined;
  const navigateBreeds = () => navigate('/breeds')
  try {
    breed = parseBreed(breedUnParsed)
  } catch {
    void navigateBreeds()
  }

  useEffect(() => {
    if (breedId) {
      void fetchBreedImages(breedId)
    }
  }, [breedId])

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

  if (!breed) return <></>

  return (
    <Modal onClose={closeModal}>
      <h1>{breed.name}</h1>
      <p>{breed.description}</p>
      <ImageGallery images={breedImages} />
    </Modal>
  )
}

export default BreedDetail
