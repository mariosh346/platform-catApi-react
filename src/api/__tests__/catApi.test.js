import { describe, it, expect, vi, afterEach } from 'vitest'
import { getRandomImages, getBreeds, getBreedImages, getImageById, getBreedById } from '../catApi'
import { parseCatImages, parseBreeds } from '../parsers'
import { setupCache } from 'axios-cache-interceptor'

vi.mock('axios-cache-interceptor', () => ({setupCache: vi.fn()}))
const mockedAxiosGet = vi.fn()
vi.mocked(setupCache).mockReturnValue({get: mockedAxiosGet})

describe('catApi', () => {
  const mockData = [
    {
      id: '1',
      url: 'https://example.com/cat1.jpg',
      breeds: [
        {
          id: 'b1',
          name: 'Breed 1',
          description: 'Description 1',
        },
      ],
    },
  ]

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getRandomImages', () => {
    it('should call the correct API endpoint', async () => {
      mockedAxiosGet.mockResolvedValue({ data: mockData })

      await getRandomImages()

      expect(mockedAxiosGet).toHaveBeenCalledWith(
        '/images/search?limit=10',
      )
    })

    it('should return an array of cat images', async () => {
      mockedAxiosGet.mockResolvedValue({ data: mockData })

      const images = await getRandomImages()

      expect(images).toEqual(parseCatImages(mockData))
    })

    it('should handle errors', async () => {
      mockedAxiosGet.mockRejectedValue(new Error('Failed to fetch'))

      await expect(getRandomImages()).rejects.toThrow('Failed to fetch')
    })
  })

  describe('getBreeds', () => {
    it('should call the correct API endpoint', async () => {
      mockedAxiosGet.mockResolvedValue({
        data: [
          {
            id: 'b1',
            name: 'Breed 1',
            description: 'Description 1',
          },
        ],
      })

      await getBreeds()

      expect(mockedAxiosGet).toHaveBeenCalledWith(
        '/breeds',
      )
    })

    it('should return an array of breeds', async () => {
      const breedData = [
        {
          id: 'b1',
          name: 'Breed 1',
          description: 'Description 1',
        },
      ]
      mockedAxiosGet.mockResolvedValue({ data: breedData })

      const breeds = await getBreeds()

      expect(breeds).toEqual(parseBreeds(breedData))
    })

    it('should handle errors', async () => {
      mockedAxiosGet.mockRejectedValue(new Error('Failed to fetch'))

      await expect(getBreeds()).rejects.toThrow('Failed to fetch')
    })
  })

  describe('getBreedImages', () => {
    it('should call the correct API endpoint', async () => {
      mockedAxiosGet.mockResolvedValue({ data: mockData })

      await getBreedImages('b1')

      expect(mockedAxiosGet).toHaveBeenCalledWith(
        '/images/search?breed_ids=b1&limit=10',
      )
    })

    it('should return an array of cat images for a specific breed', async () => {
      mockedAxiosGet.mockResolvedValue({ data: mockData })

      const images = await getBreedImages('b1')

      expect(images).toEqual(parseCatImages(mockData))
    })

    it('should handle errors', async () => {
      mockedAxiosGet.mockRejectedValue(new Error('Failed to fetch'))

      await expect(getBreedImages('b1')).rejects.toThrow('Failed to fetch')
    })
  })

  describe('getImageById', () => {
    it('should call the correct API endpoint', async () => {
      const imageId = '2'
      const mockImage = { id: imageId, url: 'https://example.com/cat2.jpg' }
      mockedAxiosGet.mockResolvedValue({ data: mockImage })

      await getImageById(imageId)

      expect(mockedAxiosGet).toHaveBeenCalledWith(`/images/${imageId}`)
    })

    it('should return a cat image', async () => {
      const imageId = '2'
      const mockImage = { id: imageId, url: 'https://example.com/cat2.jpg' }
      mockedAxiosGet.mockResolvedValue({ data: mockImage })

      const image = await getImageById(imageId)

      expect(image).toEqual(parseCatImages([mockImage])[0])
    })

    it('should handle errors', async () => {
      const imageId = '2'
      mockedAxiosGet.mockRejectedValue(new Error('Failed to fetch'))

      await expect(getImageById(imageId)).rejects.toThrow('Failed to fetch')
    })
  })

  describe('getBreedById', () => {
    it('should call the correct API endpoint', async () => {
      const breedId = 'b2'
      const mockBreed = { id: breedId, name: 'Breed 2', description: 'Description 2' }
      mockedAxiosGet.mockResolvedValue({ data: mockBreed })

      await getBreedById(breedId)

      expect(mockedAxiosGet).toHaveBeenCalledWith(`/breeds/${breedId}`)
    })

    it('should return a breed', async () => {
      const breedId = 'b2'
      const mockBreed = { id: breedId, name: 'Breed 2', description: 'Description 2' }
      mockedAxiosGet.mockResolvedValue({ data: mockBreed })

      const breed = await getBreedById(breedId)

      expect(breed).toEqual(parseBreeds([mockBreed])[0])
    })

    it('should handle errors', async () => {
      const breedId = 'b2'
      mockedAxiosGet.mockRejectedValue(new Error('Failed to fetch'))

      await expect(getBreedById(breedId)).rejects.toThrow('Failed to fetch')
    })
  })
})
