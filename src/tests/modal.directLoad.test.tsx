import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App'; // Assuming App.tsx is in the parent directory
import CatModal from '../views/ImageView'; // Renamed ImageView to CatModal
import BreedModal from '../views/BreedDetail'; // Renamed BreedDetail to BreedModal

import { vi } from 'vitest'; // Import vi for mocking

// Mock the fetch calls
vi.mock('../services/cats', () => ({
    fetchCatById: vi.fn((id) => Promise.resolve({ id, url: `http://test.com/${id}.jpg`, breeds: [{ name: `Breed ${id}`, description: `Description for ${id}` }] })),
}));

vi.mock('../services/breeds', () => ({
    fetchBreedById: vi.fn((id) => Promise.resolve({ id, name: `Breed ${id}`, description: `Description for ${id}` })),
}));

describe('Modal Direct Load', () => {
    test('direct navigation to /image/:id renders modal content as standalone page', async () => {
        const imageId = 'test-image-456';
        render(
            <MemoryRouter initialEntries={[`/image/${imageId}`]}>
                <App />
            </MemoryRouter>
        );

        // Assert modal content is present (no overlay background)
        expect(await screen.findByText(/Breed test-image-456/i)).toBeInTheDocument();
        expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
    });

    test('direct navigation to /breed/:id renders modal content as standalone page', async () => {
        const breedId = 'test-breed-789';
        render(
            <MemoryRouter initialEntries={[`/breed/${breedId}`]}>
                <App />
            </MemoryRouter>
        );

        // Assert modal content is present (no overlay background)
        expect(await screen.findByText(/Breed test-breed-789/i)).toBeInTheDocument();
        expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
    });
});
