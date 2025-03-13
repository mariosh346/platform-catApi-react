import { useState, useEffect, useMemo, JSX, memo } from 'react'
import { Link } from 'react-router-dom'
import { getBreeds } from '../api/catApi'

interface Breed {
  id: string
  name: string
  description: string
}

const BreedListItem = memo(({ breed }: { breed: Breed }) => {
  return (
    <li>
      <Link to={`/breed-detail/${breed.id}`} state={{ breed }} onMouseEnter={() => void import('./BreedDetail')}>
        {breed.name}
      </Link>
    </li>
  )
})

function Breeds(): JSX.Element {
  const [breeds, setBreeds] = useState<Breed[]>([])

  useEffect(() => {
    void fetchBreeds()
  }, [])

  const fetchBreeds = async () => {
    try {
      const data = await getBreeds()
      setBreeds(data)
    } catch (error) {
      console.error(error)
    }
  }

  const listItems = useMemo(() => {
    return breeds.map(breed => (
      <BreedListItem key={breed.id} breed={breed} />
    ))
  }, [breeds])

  return (
    <div>
      <h1>Cat Breeds</h1>
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

export default Breeds
