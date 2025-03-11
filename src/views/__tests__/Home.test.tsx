import { act, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Home from '../Home'
import * as catApi from '../../api/catApi'


describe('Home', () => {
  it('should call getRandomImages once on mount', () => {
    const mockGetRandomImages = vi.spyOn(catApi, 'getRandomImages')
    mockGetRandomImages.mockResolvedValue([])

    act(() => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      )
    })

    expect(mockGetRandomImages).toHaveBeenCalledTimes(1)
    expect(mockGetRandomImages).toHaveBeenCalledWith(10)
  })
})
