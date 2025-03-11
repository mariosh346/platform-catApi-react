import { CatImage, Breed } from './types'

export const parseCatImages = (data: unknown): CatImage[] => {
  if (!Array.isArray(data)) {
    return []
  }
  return data.map((item: unknown) => {
    if (typeof item !== 'object' || item === null || !('id' in item) || !('url' in item)) {
      throw new Error("Invalid data: Expected an object with id, name and description for Breed")
    }
    return {
      id: String(item.id),
      url: String(item.url),
      breeds: 'breeds' in item ? parseBreeds(item.breeds) : undefined,
    }
  })
}
export const parseBreed = (item: unknown): Breed => {
  if (
    typeof item !== 'object' ||
    item === null ||
    !('id' in item) ||
    !('name' in item) ||
    !('description' in item)
  ) {
    throw new Error("Invalid data: Expected an object with id, name and description for Breed")
  }

  return {
    id: String(item.id),
    name: String(item.name),
    description: String(item.description),
  }
}



export const parseBreeds = (data: unknown): Breed[] => {
  if (!Array.isArray(data)) {
    return []
  }
  return data.map((item: unknown) => 
    parseBreed(item)
)
}

