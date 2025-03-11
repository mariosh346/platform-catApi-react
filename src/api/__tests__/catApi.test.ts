import { describe, it, expect, vi, afterEach } from 'vitest'
import axios from 'axios'
import { getRandomImages, getBreeds, getBreedImages } from '../catApi'
import { parseCatImages, parseBreeds } from '../parsers'

vi.mock('axios')

const mockedAxios = vi.mocked(axios, { deep: true })
const mockedAxiosGet = vi.fn()
mockedAxios.get = mockedAxiosGet

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
      mockedAxios.get.mockResolvedValue({ data: mockData })

      await getRandomImages()

      expect(mockedAxiosGet).toHaveBeenCalledWith(
        'https://api.thecatapi.com/v1/images/search?limit=10',
      )
    })

    it('should return an array of cat images', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockData })

      const images = await getRandomImages()

      expect(images).toEqual(parseCatImages(mockData))
    })

    it('should handle errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'))

      await expect(getRandomImages()).rejects.toThrow('Failed to fetch')
    })
  })

  describe('getBreeds', () => {
    it('should call the correct API endpoint', async () => {
      mockedAxios.get.mockResolvedValue({
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
        'https://api.thecatapi.com/v1/breeds',
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
      mockedAxios.get.mockResolvedValue({ data: breedData })

      const breeds = await getBreeds()

      expect(breeds).toEqual(parseBreeds(breedData))
    })

    it('should handle errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'))

      await expect(getBreeds()).rejects.toThrow('Failed to fetch')
    })
  })

  describe('getBreedImages', () => {
    it('should call the correct API endpoint', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockData })

      await getBreedImages('b1')

      expect(mockedAxiosGet).toHaveBeenCalledWith(
        'https://api.thecatapi.com/v1/images/search?breed_ids=b1&limit=10',
      )
    })

    it('should return an array of cat images for a specific breed', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockData })

      const images = await getBreedImages('b1')

      expect(images).toEqual(parseCatImages(mockData))
    })

    it('should handle errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'))

      await expect(getBreedImages('b1')).rejects.toThrow('Failed to fetch')
    })
  })
})
