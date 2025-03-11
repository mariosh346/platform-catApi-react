import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'


// beforeAll(() => {
//     vi.mock('../../api/catApi', () => ({
//         getRandomImages: vi.fn(() => [])
//      }))
//     vi.mock('../../hooks/useFavorites', () => ({
//     useFavorites: () => ({
//         addFavorite: vi.fn()
//     })
//     }))
// })

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
