import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Home } from '../components/Home';

test('renders a header with a title', () => {
    render(<Home />);
    const headerElement = screen.getByText(/Port Time/i);
    expect(headerElement).toBeInTheDocument();
});

test('renders a search button', () => {
    render(<Home />);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
});

test('renders a search input', () => {
    render(<Home />);
    const searchInput = screen.getByRole('textbox', { name: 'City:' });
    expect(searchInput).toBeInTheDocument();
});
