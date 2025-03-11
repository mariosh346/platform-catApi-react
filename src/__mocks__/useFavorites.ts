import { vi } from 'vitest'

export const useFavorites = () => ({
  favorites: [],
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
  isLoading: false,
  error: null
})
