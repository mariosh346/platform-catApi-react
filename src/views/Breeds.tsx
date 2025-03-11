import { useState, useEffect, JSX } from 'react'
import { Link } from 'react-router-dom'
import { getBreeds } from '../api/catApi'

interface Breed {
  id: string
  name: string
  description: string
}

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

  return (
    <div>
      <h1>Cat Breeds</h1>
      <ul>
        {breeds.map(breed => (
          <li key={breed.id}>
            <Link to={`/breed-detail/${breed.id}`} state={{ breed }}>
              {breed.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breeds
