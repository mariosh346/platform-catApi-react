export interface CatImage {
  id: string
  url: string
  breeds?: Breed[]
}

export interface Breed {
  id: string
  name: string
  description: string
}
