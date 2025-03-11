import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'
console.log('setupTests')


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

// Ensure mocks are cleared after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
