import { describe, it, expect } from 'vitest'
import { parseCatImages, parseBreeds } from '../src/api/parsers'

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

  it('should parse the id of a valid cat image', () => {
    const expectedId = '1'
    expect(parseCatImages(catImageData)[0].id).toEqual(expectedId)
  })

  it('should parse the url of a valid cat image', () => {
    const expectedUrl = 'https://example.com/cat1.jpg'
    expect(parseCatImages(catImageData)[0].url).toEqual(expectedUrl)
  })

  it('should parse the breeds of a valid cat image', () => {
    const expectedBreeds = [
      {
        id: 'b1',
        name: 'Breed 1',
        description: 'Description 1',
      },
    ]
    expect(parseCatImages(catImageData)[0].breeds).toEqual(expectedBreeds)
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

  it('should throw an error if the data is not an array', () => {
    expect(() => parseCatImages({})).toThrowError(
      'Invalid data: Expected an array for CatImages',
    )
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

  it('should parse the id of a valid breed', () => {
    const expectedId = 'b1'
    expect(parseBreeds(breedData)[0].id).toEqual(expectedId)
  })

  it('should parse the name of a valid breed', () => {
    const expectedName = 'Breed 1'
    expect(parseBreeds(breedData)[0].name).toEqual(expectedName)
  })

  it('should parse the description of a valid breed', () => {
    const expectedDescription = 'Description 1'
    expect(parseBreeds(breedData)[0].description).toEqual(expectedDescription)
  })

  it('should throw an error if the data is not an array', () => {
    expect(() => parseBreeds({})).toThrowError(
      'Invalid data: Expected an array for Breeds',
    )
  })

  it('should throw an error if the data is missing required properties', () => {
    const data = [{ id: 'b1' }]
    expect(() => parseBreeds(data)).toThrowError(
      'Invalid data: Expected an object with id, name and description for Breed',
    )
  })
})
