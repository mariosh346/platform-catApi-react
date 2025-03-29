import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setupCache } from 'axios-cache-interceptor'
import axios from 'axios'
vi.mock('axios')

const mockedAxios = vi.mocked(axios, { deep: true })
const mockedAxiosCreate = vi.fn(val => val)
mockedAxios.create = mockedAxiosCreate

vi.mock('axios-cache-interceptor', () => ({
  setupCache: vi.fn(() => ({
    cached: true,
    get: vi.fn(),
  })),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getAxios', () => {
  it('should create a cached axios instance with axios and the correct ttl', async () => {
    const { getAxios } = await import('../axiosCached.ts')
    const cachedInstance = getAxios()
    expect(cachedInstance).toHaveProperty('cached', true)
    const calls = vi.mocked(setupCache).mock.calls[0]
    expect(calls).toMatchSnapshot()
  })
})
