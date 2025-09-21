import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from '../App'; // Assuming App.tsx is in the parent directory
import Home from '../views/Home';
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

// Helper component to get current location
const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
};

describe('Modal Deep Link and History', () => {
    test('modal opens and URL changes on image click', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Wait for images to load (assuming ImageCard is rendered in Home)
        const catImage = await screen.findByAltText(/Cat/i);
        fireEvent.click(catImage);

        // Assert URL changes to /image/:id and modal is visible
        expect(await screen.findByTestId('location-display')).toHaveTextContent(/\/image\/\w+/);
        expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });

    test('direct navigation to /image/:id renders modal content as standalone page', async () => {
        const imageId = 'test-image-123';
        render(
            <MemoryRouter initialEntries={[`/image/${imageId}`]}>
                <App />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Assert modal content is present (no overlay background)
        expect(await screen.findByText(/Breed test-image-123/i)).toBeInTheDocument();
        expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument(); // Assuming overlay has data-testid="modal-overlay"
        expect(await screen.findByTestId('location-display')).toHaveTextContent(`/image/${imageId}`);
    });

    test('closing modal returns to previous page', async () => {
        render(
            <MemoryRouter initialEntries={['/', '/image/test-image-123']}>
                <App />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Close button click
        fireEvent.click(await screen.findByLabelText('Close'));
        expect(await screen.findByTestId('location-display')).toHaveTextContent('/');
    });

    test('back/forward navigation between multiple modal opens works correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Open image A
        const catImageA = await screen.findAllByAltText(/Cat/i);
        fireEvent.click(catImageA[0]);
        expect(await screen.findByTestId('location-display')).toHaveTextContent(/\/image\/\w+/);
        const imageIdA = (await screen.findByTestId('location-display')).textContent?.split('/').pop();

        // Open image B from overlay (simulated by clicking another image)
        const catImageB = await screen.findAllByAltText(/Cat/i);
        fireEvent.click(catImageB[1]);
        expect(await screen.findByTestId('location-display')).toHaveTextContent(/\/image\/\w+/);
        const imageIdB = (await screen.findByTestId('location-display')).textContent?.split('/').pop();
        expect(imageIdA).not.toBe(imageIdB);

        // Press back - should go to image A
        act(() => {
            window.history.back();
        });
        expect(await screen.findByTestId('location-display')).toHaveTextContent(new RegExp(`/image/${imageIdA}`));

        // Press back again - should go to list
        act(() => {
            window.history.back();
        });
        expect(await screen.findByTestId('location-display')).toHaveTextContent('/');
    });

    test('Escape key closes modal', async () => {
        render(
            <MemoryRouter initialEntries={['/', '/image/test-image-123']}>
                <App />
                <LocationDisplay />
            </MemoryRouter>
        );

        fireEvent.keyDown(window, { key: 'Escape' });
        expect(await screen.findByTestId('location-display')).toHaveTextContent('/');
    });

    test('backdrop click closes modal', async () => {
        render(
            <MemoryRouter initialEntries={['/', '/image/test-image-123']}>
                <App />
                <LocationDisplay />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId('modal-backdrop')); // Assuming backdrop has data-testid="modal-backdrop"
        expect(await screen.findByTestId('location-display')).toHaveTextContent('/');
    });
});
});
