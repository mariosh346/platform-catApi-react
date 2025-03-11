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

  const removeFavorite = (img: CatImage) => {
    const newFavorites = favorites.filter(fav => fav.id !== img.id)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  return { favorites, addFavorite, removeFavorite }
}
