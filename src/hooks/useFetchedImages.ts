import { useState, useCallback, useEffect } from 'react'
import { getRandomImages } from '../api/catApi'
import { CatImage } from '../api/types'
import { parseCatImages } from '../api/parsers'

const useFetchedImages = () => {
  const [images, setImages] = useState<CatImage[]>(() => {
    const stored = localStorage.getItem('fetchedImages')
    return stored ? parseCatImages(JSON.parse(stored)) : []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await getRandomImages(10)
      setImages(data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch images')
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  useEffect(() => {
    localStorage.setItem('fetchedImages', JSON.stringify(images))
  }, [images])

  return { images, fetchImages, isLoading, error }
}

export default useFetchedImages
