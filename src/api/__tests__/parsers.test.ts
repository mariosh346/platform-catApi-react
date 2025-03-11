import { describe, it, expect } from 'vitest'
import { parseCatImages, parseBreeds } from '../parsers'

describe('parseCatImages', () => {
  const catImageData = [
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

  it('should parse the catImageData of a valid cat', () => {
    expect(parseCatImages(catImageData)).toEqual(catImageData)
  })

  it('should handle missing breeds property', () => {
    const data = [
      {
        id: '2',
        url: 'https://example.com/cat2.jpg',
      },
    ]
    expect(parseCatImages(data)[0].breeds).toBeUndefined()
  })

  it('should return empty array  if the data is not an array', () => {
    expect(parseCatImages({})).toEqual([])
  })

  it('should throw an error if the data is missing required properties', () => {
    const data = [{ id: '1' }]
    expect(() => parseCatImages(data)).toThrowError(
      'Invalid data: Expected an object with id, name and description for Breed',
    )
  })
})

describe('parseBreeds', () => {
  const breedData = [
    {
      id: 'b1',
      name: 'Breed 1',
      description: 'Description 1',
    },
  ]
  it('should parse the breedData of valid breeds', () => {
    expect(parseBreeds(breedData)).toEqual(breedData)
  })

  it('should return empty array if the data is not an array', () => {
    expect(parseBreeds({})).toEqual([])
  })

  it('should throw an error if the data is missing required properties', () => {
    const data = [{ id: 'b1' }]
    expect(() => parseBreeds(data)).toThrowError(
      'Invalid data: Expected an object with id, name and description for Breed',
    )
  })
})
