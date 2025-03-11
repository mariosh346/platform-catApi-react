import { useState, useEffect } from 'react'
import { parseCatImages } from '../api/parsers'
import { CatImage } from '../api/types'

export function useFavorites() {
  const [favorites, setFavorites] = useState<CatImage[]>([])

  useEffect(() => {
    const favs: unknown = JSON.parse(localStorage.getItem('favorites') ?? '[]')
    const favsParsed = parseCatImages(favs)
    setFavorites(favsParsed)
  }, [])

  const addFavorite = (img: CatImage) => {
    const updatedFavorites = [...favorites, img]
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return { favorites, addFavorite }
}
