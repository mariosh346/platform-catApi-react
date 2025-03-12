import { act, render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Home from '../Home'
import * as catApi from '../../api/catApi'


describe('Home', () => {
  const mockGetRandomImages = vi.spyOn(catApi, 'getRandomImages')
  mockGetRandomImages.mockResolvedValue([])
  let rendered: ReturnType<typeof render>;

  beforeEach(() => {
    act(() => {
      rendered = render(
          <Home />
      );
    });
  })

  it('should call getRandomImages once on mount', () => {
    expect(mockGetRandomImages).toHaveBeenCalledTimes(1)
    expect(mockGetRandomImages).toHaveBeenCalledWith(10)
  })
  it('should have the same snapshot as befoere', () => {
    expect(rendered.baseElement).toMatchSnapshot()
  })
})
