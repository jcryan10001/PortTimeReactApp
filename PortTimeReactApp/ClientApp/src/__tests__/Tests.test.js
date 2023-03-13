import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Home } from '../components/Home';

test('renders Home component', () => {
    const props = {
        loading: false,
        cityWeather: {
            city: 'New York',
            region: 'NY',
            country: 'US'
        },
        searchQuery: 'New York',
        handleSearchChange: jest.fn(),
        handleSearchSubmit: jest.fn(),
    };

    render(<Home {...props} />);

    const headerElement = screen.getByText(/Port Time/i);
    expect(headerElement).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
});
