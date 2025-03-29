import { parseCatImages, parseBreeds } from './parsers'
import { CatImage, Breed } from './types'
import { getAxios } from './axiosCached'

export const getRandomImages = async (limit = 10): Promise<CatImage[]> => {
  const res = await getAxios().get(`/images/search?limit=${limit.toString()}`)
  return parseCatImages(res.data)
}

export const getBreeds = async (): Promise<Breed[]> => {
  const res = await getAxios().get(`/breeds`)
  return parseBreeds(res.data)
}

export const getBreedImages = async (breedId: string, limit = 10): Promise<CatImage[]> => {
  const res = await getAxios().get(`/images/search?breed_ids=${breedId}&limit=${limit.toString()}`)
  return parseCatImages(res.data)
}

export const getImageById = async (imageId: string): Promise<CatImage> => {
  const res = await getAxios().get(`/images/${imageId}`)
  return parseCatImages([res.data])[0]
}

export const getBreedById = async (breedId: string): Promise<Breed> => {
  const res = await getAxios().get(`/breeds/${breedId}`)
  return parseBreeds([res.data])[0]
}
