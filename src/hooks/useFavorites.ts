import { useState, useEffect } from 'react'
import { parseCatImages } from '../api/parsers'
import { CatImage } from '../api/types'

const LOCAL_STORAGE_FAVORITES_KEY = 'favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<CatImage[]>([])

  useEffect(() => {
    const favs: unknown = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY) ?? '[]')
    const favsParsed = parseCatImages(favs)
    setFavorites(favsParsed)
  }, [])

  const addFavorite = (img: CatImage) => {
    const updatedFavorites = [...favorites, img]
    setFavorites(updatedFavorites)
    localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(updatedFavorites))
  }

  const removeFavorite = (img: CatImage) => {
    const newFavorites = favorites.filter(fav => fav.id !== img.id)
    setFavorites(newFavorites)
    localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(newFavorites))
  }

  return { favorites, addFavorite, removeFavorite }
}
