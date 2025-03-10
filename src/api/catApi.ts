import axios from 'axios'
import { parseCatImages, parseBreeds } from './parsers'
import { CatImage, Breed } from './types'

const BASE_URL = 'https://api.thecatapi.com/v1'

export const getRandomImages = async (limit = 10): Promise<CatImage[]> => {
  const res = await axios.get(`${BASE_URL}/images/search?limit=${limit.toString()}`)
  return parseCatImages(res.data)
}

export const getBreeds = async (): Promise<Breed[]> => {
  const res = await axios.get(`${BASE_URL}/breeds`)
  return parseBreeds(res.data)
}

export const getBreedImages = async (breedId: string, limit = 10): Promise<CatImage[]> => {
  const res = await axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}&limit=${limit.toString()}`)
  return parseCatImages(res.data)
}
